import { when } from 'jest-when';
import { Equal, Repository } from 'typeorm';
import { EventsService } from './events.service';
import { Event } from './event.entity';

const repository = new Repository<Event>({} as any, {} as any);
const eventsService = new EventsService(repository);

describe(EventsService, () => {
  describe('findAllBy', () => {
    it('returns a JSON of reverse sorted events', async () => {
      const id = '03f3306d-a4a3-4179-ab88-81af66df8b7c';

      when(jest.spyOn(repository, 'findBy'))
        .calledWith({ care_recipient_id: Equal(id) })
        .mockResolvedValue(rawTestResponse);

      const response = await eventsService.findAllBy(id)

      const sortedResponse = [...rawTestResponse].sort((a, b) => { return b.timestamp.localeCompare(a.timestamp) })

      expect(response).toEqual(sortedResponse)
    });
  });
});

const rawTestResponse: Event[] = [
  {
    id: '00114a9f-00dc-4f39-a6ac-af1b7e0543e7',
    payload: {
      id: '0727399e-c3a3-48e8-9bbc-34d491cc4dbd',
      timestamp: '2019-04-26T07:08:21.758Z',
      event_type: 'fluid_intake_observation',
      consumed_volume_ml: 230,
      caregiver_id: '220d9432-b5ed-4c81-8709-434899d2cd1b',
      care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d',
      visit_id: '5cce1970-8b66-f8a8-4f57-664f682ae36d',
      fluid: 'water',
      observed: true
    },
    timestamp: '2019-04-26T07:08:21.758Z',
    care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d',
  },
  {
    id: '006139b8-a387-4529-9280-2d798c500aeb',
    payload: {
      id: '006139b8-a387-4529-9280-2d798c500aeb',
      timestamp: '2019-05-12T07:23:12.789Z',
      event_type: 'task_completed',
      task_schedule_note: 'Please assist me to brush my teeth',
      task_definition_description: 'Assist with oral hygiene',
      caregiver_id: '220d9432-b5ed-4c81-8709-434899d2cd1b',
      care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d',
      visit_id: '5cce1970-8b66-f8a8-4f57-664f682ae36d',
      task_instance_id: '1',
      task_schedule_id: '2',
      task_definition_id: '3',
    },
    timestamp: '2019-05-12T07:23:12.789Z',
    care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d',
  },
  {
    id: '0727399e-c3a3-48e8-9bbc-34d491cc4dbd',
    payload: {
      id: '0727399e-c3a3-48e8-9bbc-34d491cc4dbd',
      visit_id: '5cce1970-8b66-f8a8-4f57-664f682ae36d',
      timestamp: '2019-05-05T06:33:14.547Z',
      event_type: 'check_in',
      caregiver_id: '220d9432-b5ed-4c81-8709-434899d2cd1b',
      care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d',
    },
    timestamp: '2019-05-05T06:33:14.547Z',
    care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d',
  },
];
