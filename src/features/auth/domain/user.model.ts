export interface IUserProperties {
  id: number
  name: string
  firstName: string
  lastName: string
  email: string
}

export type IUnsavedUserProperties = Omit<IUserProperties, 'id'>

export class UserModel {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string
  ) {}
}
