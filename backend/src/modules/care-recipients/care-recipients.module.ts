import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from '../../entities/events/events.service';
import { Event } from '../../entities/events/event.entity';
import { CareRecipientsController } from './care-recipients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsService],
  controllers: [CareRecipientsController],
})
export class CareRecipientsModule {}
