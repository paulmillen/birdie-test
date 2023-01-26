import { Repository } from 'typeorm';
import { Event } from './event.entity';
export declare class EventsService {
    private eventRepository;
    constructor(eventRepository: Repository<Event>);
    findAllBy(recipientId: string): Promise<Event['payload'][]>;
}
