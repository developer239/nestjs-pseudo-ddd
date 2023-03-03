import { TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { TestingEntityService } from 'src/_packages/testing/testing-entity.service'
import { bootstrap } from 'src/_packages/testing/utilities'
import { UserEntity } from 'src/features/auth/infrastructure/user.entity'
import { createEventModelFixture } from 'src/features/events/domain/event.model.fixtures'
import { EventEntity } from 'src/features/events/infrastructure/event.entity'
import { EventRepositoryImplement } from 'src/features/events/infrastructure/event.repository'

describe('[infrastructure] events repository', () => {
  let eventRepositoryImplement: EventRepositoryImplement
  let databaseService: TestingDatabaseService
  let testingEntityService: TestingEntityService

  describe('listEvents', () => {
    it('should list events', async () => {
      const expectedEvent = await testingEntityService.createFixture(
        EventEntity,
        createEventModelFixture()
      )

      const result = await eventRepositoryImplement.listEvents()

      // TODO: users in the result contain password and salt
      expect(result).toMatchObject([expectedEvent])
    })
  })

  //
  //
  // setup

  beforeAll(async () => {
    const moduleRef: TestingModule = await bootstrap({
      imports: [TypeOrmModule.forFeature([EventEntity, UserEntity])],
      providers: [EventRepositoryImplement],
    })

    eventRepositoryImplement = moduleRef.get(EventRepositoryImplement)
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
