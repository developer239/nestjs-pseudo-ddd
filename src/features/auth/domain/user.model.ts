import { Exclude } from 'class-transformer'

export interface IUserProperties {
  id: number
  username: string
  password: string
  salt: string
}

export type IUnsavedUserProperties = Omit<IUserProperties, 'id'>

export class UserModel {
  @Exclude() public password: string

  @Exclude() public salt: string
  public id: number
  public username: string

  constructor(user: IUserProperties) {
    // TODO: fix createFixture helper
    if(user) {
      this.id = user.id
      this.username = user.username
      this.password = user.password
      this.salt = user.salt
    }
  }
}
