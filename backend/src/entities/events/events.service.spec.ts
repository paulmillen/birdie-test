import { when, resetAllWhenMocks } from 'jest-when';
import { Like, Repository } from 'typeorm';
import { EventsService } from './events.service';
import { Event } from './event.entity';

const repository = new Repository<Event>({} as any, {} as any);
const eventsService = new EventsService(repository);

describe(EventsService, () => {
  beforeEach(() => {
    jest.resetAllMocks();
    resetAllWhenMocks();
  });

  describe('findByDateOrLatestFor', () => {
    it('calls the repository correctly when the date is undefined', async () => {
      const id = '03f3306d-a4a3-4179-ab88-81af66df8b7c';

      when(jest.spyOn(repository, 'findOne'))
        .calledWith({
          where: [{ care_recipient_id: id }],
          order: { timestamp: 'DESC' },
        })
        .mockResolvedValue(testEvents[0]);

      when(jest.spyOn(repository, 'find'))
        .calledWith({
          select: {
            payload: true,
          },
          where: {
            care_recipient_id: id,
            timestamp: Like(`${testEvents[0].timestamp.slice(0, 10)}%`),
          },
          order: {
            timestamp: 'ASC',
          },
        })
        .mockResolvedValue([testEvents[0]]);

      const response = await eventsService.findByDateOrLatestFor(id);

      expect(response).toEqual([testEvents[0].payload]);
    });

    it('calls the repository correctly when the date is present', async () => {
      const id = '03f3306d-a4a3-4179-ab88-81af66df8b7c';

      when(jest.spyOn(repository, 'find'))
        .calledWith({
          select: {
            payload: true,
          },
          where: {
            care_recipient_id: id,
            timestamp: Like('2019-04-26%'),
          },
          order: {
            timestamp: 'ASC',
          },
        })
        .mockResolvedValue([testEvents[0]]);

      const response = await eventsService.findByDateOrLatestFor(
        id,
        '2019-04-26',
      );

      expect(response).toEqual([testEvents[0].payload]);
    });
  });
});

const testEvents: Event[] = [
  {
    id: '00114a9f-00dc-4f39-a6ac-af1b7e0543e7',
    payload: JSON.stringify({
      id: '0727399e-c3a3-48e8-9bbc-34d491cc4dbd',
      timestamp: '2019-04-26T07:08:21.758Z',
      event_type: 'fluid_intake_observation',
      consumed_volume_ml: 230,
      caregiver_id: '220d9432-b5ed-4c81-8709-434899d2cd1b',
      care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d',
      visit_id: '5cce1970-8b66-f8a8-4f57-664f682ae36d',
      fluid: 'water',
      observed: true,
    }),
    timestamp: '2019-04-26T07:08:21.758Z',
    care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d',
  },
];
