import { EventsService } from '../../entities/events/events.service';
import { Event } from '../../entities/events/event.entity';
export declare class CareRecipientsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getAllEvents(params: any): Promise<Event[]>;
}
