import { EventModel } from 'src/features/events/domain/event.model'

export abstract class EventRepository {
  public abstract listEvents(): Promise<EventModel[]>
}
