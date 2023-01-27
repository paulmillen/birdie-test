import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Event } from './event.entity';

export type DailyEventsItem = [string, Event['payload'][]]
  
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) { }

  async findAllBy(recipientId: string): Promise<DailyEventsItem[]> {
    const events = await this.eventRepository.findBy({
      care_recipient_id: Equal(recipientId),
    })

    const sortedByLatest = [...events].sort((a, b) => { return b.timestamp.localeCompare(a.timestamp) })

    const map = new Map<string, Event['payload'][]>()

    sortedByLatest.forEach((event) => {
      const dateKey = event.timestamp.slice(0, 10)
      map.set(dateKey, [event.payload, ...(map.get(dateKey) ?? [])])
    });

    return [...map.entries()]
  }
}