import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { BaseRepository } from 'src/_packages/core/entities/base.repository'
import { UserModel } from 'src/features/auth/domain/user.model'
import {
  EventModel,
  IUnsavedEventProperties,
} from 'src/features/events/domain/event.model'
import { EventRepository } from 'src/features/events/domain/event.repository'
import { EventEntity } from 'src/features/events/infrastructure/event.entity'

@Injectable()
export class EventRepositoryImplement
  extends BaseRepository<EventEntity, EventModel>
  implements EventRepository
{
  @InjectDataSource() private readonly dataSource: DataSource

  public async listEvents(): Promise<EventModel[]> {
    const entities = await this.dataSource.manager.find(EventEntity, {
      relations: ['owner', 'attendees'],
    })

    return entities.map((entity) => this.entityToModel(entity))
  }

  public entityToModel(entity: EventEntity): EventModel {
    const owner = entity.owner
      ? new UserModel(
          entity.owner.id,
          entity.owner.firstName,
          entity.owner.lastName,
          entity.owner.email
        )
      : undefined

    const attendees = entity.attendees
      ? entity.attendees.map(
          (attendee) =>
            new UserModel(
              attendee.id,
              attendee.firstName,
              attendee.lastName,
              attendee.email
            )
        )
      : []

    return new EventModel(
      entity.id,
      entity.title,
      entity.description,
      entity.startsAt,
      entity.capacity,
      owner,
      attendees
    )
  }

  public propertiesToEntity(properties: IUnsavedEventProperties): EventEntity {
    const entity = new EventEntity()
    entity.title = properties.title
    entity.description = properties.description
    entity.startsAt = properties.startsAt
    entity.capacity = properties.capacity

    return entity
  }
}