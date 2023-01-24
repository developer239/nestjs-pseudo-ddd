/* eslint-disable max-params */
import { IUserProperties, UserModel } from 'src/features/auth/domain/user.model'

export interface IEventProperties {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly startsAt: Date
  readonly capacity: number
  readonly owner: IUserProperties
  readonly attendees: IUserProperties[]
}

export type IUnsavedEventProperties = Omit<IEventProperties, 'id'>

export class EventModel {
  private readonly id: number

  private readonly title: string

  private readonly description: string

  private readonly startsAt: Date

  private readonly capacity: number

  private readonly owner: UserModel

  private readonly attendees: UserModel[]

  constructor(
    id: number,
    title: string,
    description: string,
    startsAt: Date,
    capacity: number,
    owner?: UserModel,
    attendees?: UserModel[]
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.startsAt = startsAt
    this.capacity = capacity

    if(owner) this.owner = owner
    if(attendees) this.attendees = attendees
  }
}
