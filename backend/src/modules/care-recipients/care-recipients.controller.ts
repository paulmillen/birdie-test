import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from '../../entities/events/events.service';
import { Event } from '../../entities/events/event.entity';

@Controller('care-recipients/:id')
export class CareRecipientsController {
	constructor(private readonly eventsService: EventsService) { }

	@Get('events')
	async getAllEvents(@Param() params): Promise<Event['payload'][]> {
		return await this.eventsService.findAllBy(params.id);
	}
}
