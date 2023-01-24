import { Injectable } from '@nestjs/common'
import { BaseRepository } from 'src/_packages/core/entities/base.repository'
import {
  IUnsavedUserProperties,
  UserModel,
} from 'src/features/auth/domain/user.model'
import { UserEntity } from 'src/features/auth/infrastructure/user.entity'

@Injectable()
export class UserBaseRepository extends BaseRepository<UserEntity, UserModel> {
  public entityToModel(entity: UserEntity): UserModel {
    return new UserModel(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.email
    )
  }

  public propertiesToEntity(properties: IUnsavedUserProperties): UserEntity {
    const entity = new UserEntity()
    entity.firstName = properties.firstName
    entity.lastName = properties.lastName
    entity.email = properties.email

    return entity
  }
}
