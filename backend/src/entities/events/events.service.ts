import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) { }

  async findAllBy(recipientId: string): Promise<Event[]> {
    return (await this.eventRepository.findBy({
      care_recipient_id: Equal(recipientId),
    })).sort((a, b) => { return b.timestamp.localeCompare(a.timestamp) });
  }
}