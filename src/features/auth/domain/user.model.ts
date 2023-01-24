export interface IUserProperties {
  readonly id: number
  readonly name: string
  readonly firstName: string
  readonly lastName: string
  readonly email: string
}

export type IUnsavedUserProperties = Omit<IUserProperties, 'id'>

export class UserModel {
  private readonly id: number

  private readonly firstName: string

  private readonly lastName: string

  private readonly email: string

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }
}
