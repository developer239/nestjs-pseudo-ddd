// eslint-disable-next-line import/no-extraneous-dependencies
import { randFirstName, randLastName, randEmail } from '@ngneat/falso'
import {
  IUnsavedUserProperties,
  UserModel,
} from 'src/features/auth/domain/user.model'

export const createUserModelFixture = (
  data: Partial<IUnsavedUserProperties> = {}
): UserModel =>
  new UserModel(
    undefined as any,
    data.firstName || randFirstName(),
    data.lastName || randLastName(),
    data.email || randEmail()
  )
