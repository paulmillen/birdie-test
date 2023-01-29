import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService, Event } from '../../entities/events';

@Controller('api/care-recipients/:id')
export class CareRecipientsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('events')
  async getLatestByDate(
    @Param() params,
    @Query() query,
  ): Promise<Event['payload'][]> {
    return await this.eventsService.findByDateOrLatestFor(
      params.id,
      query.date,
    );
  }
}
