import { Controller, Get, Param } from '@nestjs/common';
import { DailyEventsItem, EventsService } from '../../entities/events/events.service';

@Controller('care-recipients/:id')
export class CareRecipientsController {
	constructor(private readonly eventsService: EventsService) { }

	@Get('events')
	async getAllEvents(@Param() params): Promise<DailyEventsItem[]> {
		return await this.eventsService.findAllBy(params.id);
	}
}
