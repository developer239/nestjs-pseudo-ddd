import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { BaseRepository } from 'src/_packages/core/entities/base.repository'
import {
  IUnsavedUserProperties,
  UserModel,
} from 'src/features/auth/domain/user.model'
import { UserRepository } from 'src/features/auth/domain/user.repository'
import { UserEntity } from 'src/features/auth/infrastructure/user.entity'
import { CreateUserDTO } from 'src/features/auth/presentation/dto/createUser.dto'

@Injectable()
export class UserRepositoryImplement
  extends BaseRepository<UserEntity, UserModel>
  implements UserRepository
{
  @InjectDataSource() private readonly dataSource: DataSource

  async findByUsername(username: string): Promise<UserModel> {
    const entity = await this.dataSource.manager.findOne(UserEntity, {
      where: { username },
    })

    if (!entity) {
      throw new NotFoundException(`User with username ${username} not found`)
    }

    return new UserModel({
      id: entity.id,
      username: entity.username,
      password: entity.password,
      salt: entity.salt,
    })
  }

  async signUp(createDTO: CreateUserDTO): Promise<UserModel> {
    const user = new UserEntity()
    user.username = createDTO.username
    user.salt = createDTO.salt
    user.password = createDTO.password

    try {
      await user.save()
      return user
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw error
      }
    }
  }

  protected entityToModel(entity: UserEntity): UserModel {
    return new UserModel({
      id: entity.id,
      username: entity.username,
      password: entity.password,
      salt: entity.salt,
    })
  }

  protected propertiesToEntity(properties: IUnsavedUserProperties): UserEntity {
    const entity = new UserEntity()
    entity.username = properties.username
    entity.password = properties.password
    entity.salt = properties.salt

    return entity
  }
}
