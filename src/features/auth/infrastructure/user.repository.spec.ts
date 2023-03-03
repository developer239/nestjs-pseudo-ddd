import { TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { TestingEntityService } from 'src/_packages/testing/testing-entity.service'
import { bootstrap } from 'src/_packages/testing/utilities'
import { createUserModelFixture } from 'src/features/auth/domain/user.model.fixtures'
import { UserEntity } from 'src/features/auth/infrastructure/user.entity'
import { UserRepositoryImplement } from 'src/features/auth/infrastructure/user.repository'

describe('[infrastructure] users repository', () => {
  let userRepositoryImplement: UserRepositoryImplement
  let databaseService: TestingDatabaseService
  let testingEntityService: TestingEntityService

  describe('findByUsername', () => {
    it('should find user by username', async () => {
      const expectedUser = await testingEntityService.createFixture(
        UserEntity,
        createUserModelFixture()
      )

      const result = await userRepositoryImplement.findByUsername(
        expectedUser.username
      )

      expect(result).toEqual(expectedUser)
    })
  })

  describe('signUp', () => {
    it('should create new user', async () => {
      const userData = createUserModelFixture()
      const signUpData = {
        username: userData.username,
        password: userData.password,
        salt: userData.salt,
      }

      const result = await userRepositoryImplement.signUp(signUpData)

      expect(result).toMatchObject(signUpData)
    })
  })

  //
  //
  // setup

  beforeAll(async () => {
    const moduleRef: TestingModule = await bootstrap({
      imports: [TypeOrmModule.forFeature([UserEntity])],
      providers: [UserRepositoryImplement],
    })

    userRepositoryImplement = moduleRef.get(UserRepositoryImplement)
    databaseService = moduleRef.get(TestingDatabaseService)
    testingEntityService = moduleRef.get(TestingEntityService)
  })

  afterEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.dataSource.destroy()
  })
})
