import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Event } from './event.entity';

export type DailyEventsItem = [string, Event['payload'][]];

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async findByDateOrLatestFor(
    recipientId: string,
    date?: string,
  ): Promise<Event['payload'][]> {
    if (date === undefined) {
      const latestEvent = await this.eventRepository.findOne({
        where: [{ care_recipient_id: recipientId }],
        order: { timestamp: 'DESC' },
      });

      return this.findByDateFor(
        recipientId,
        latestEvent.timestamp.slice(0, 10),
      );
    }

    return this.findByDateFor(recipientId, date);
  }

  private async findByDateFor(
    recipientId: string,
    date?: string,
  ): Promise<Event['payload'][]> {
    return (
      await this.eventRepository.find({
        select: {
          payload: true,
        },
        where: {
          care_recipient_id: recipientId,
          timestamp: Like(`${date}%`),
        },
        order: {
          timestamp: 'ASC',
        },
      })
    ).map((event) => event.payload);
  }
}
