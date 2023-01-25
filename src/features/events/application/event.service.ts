import { Injectable } from '@nestjs/common'
import { EventModel } from 'src/features/events/domain/event.model'
import { EventRepository } from 'src/features/events/domain/event.repository'

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventRepository) {}

  listEvents(): Promise<EventModel[]> {
    return this.eventRepository.listEvents()
  }
}
