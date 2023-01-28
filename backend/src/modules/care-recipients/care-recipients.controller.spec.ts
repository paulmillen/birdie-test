import { when } from 'jest-when';
import { CareRecipientsController } from './care-recipients.controller';
import { EventsService } from '../../entities/events/events.service';

describe('CareRecipientController', () => {
  const eventService = new EventsService({} as any);
  const controller = new CareRecipientsController(eventService);

  beforeEach(async () => {
    jest.resetAllMocks();
  });

  describe('care-recipients/:id/events', () => {
    it('should call the correct service', async () => {
      const id = '03f3306d-a4a3-4179-ab88-81af66df8b7c';
      const date = '2020-01-01';

      const eventPayload = JSON.stringify({
        care_recipient_id: id,
        mood: 'okay',
      });

      when(jest.spyOn(eventService, 'findByDateOrLatestFor'))
        .calledWith(id, date)
        .mockResolvedValue([eventPayload]);

      const response = await controller.getLatestByDate({ id }, { date });
      expect(response).toEqual([eventPayload]);
    });
  });
});
