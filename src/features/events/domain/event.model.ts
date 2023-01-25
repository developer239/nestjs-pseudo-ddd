/* eslint-disable max-params */
import { IUserProperties, UserModel } from 'src/features/auth/domain/user.model'

export interface IEventProperties {
  id: number
  title: string
  description: string
  startsAt: Date
  capacity: number
  owner: IUserProperties
  attendees: IUserProperties[]
}

export type IUnsavedEventProperties = Omit<IEventProperties, 'id'>

export class EventModel {
  public id: number

  public title: string

  public description: string

  public startsAt: Date

  public capacity: number

  public owner: UserModel

  public attendees: UserModel[]

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

    if (owner) this.owner = owner
    if (attendees) this.attendees = attendees
  }
}
