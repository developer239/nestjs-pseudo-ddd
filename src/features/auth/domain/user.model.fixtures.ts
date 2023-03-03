// eslint-disable-next-line import/no-extraneous-dependencies
import { randEmail } from '@ngneat/falso'
import {
  IUnsavedUserProperties,
  UserModel,
} from 'src/features/auth/domain/user.model'

export const createUserModelFixture = (
  data: Partial<IUnsavedUserProperties> = {}
): UserModel =>
  new UserModel({
    id: undefined as any,
    username: data.username || randEmail(),
    password: data.password || 'password',
    salt: data.salt || 'salt',
  })
