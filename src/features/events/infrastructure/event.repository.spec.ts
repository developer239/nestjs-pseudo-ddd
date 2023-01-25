import { TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { TestingEntityService } from 'src/_packages/testing/testing-entity.service'
import { bootstrap } from 'src/_packages/testing/utilities'
import { UserEntity } from 'src/features/auth/infrastructure/user.entity'
import { createEventModelFixture } from 'src/features/events/domain/event.model.fixtures'
import { EventEntity } from 'src/features/events/infrastructure/event.entity'
import { EventRepositoryImplement } from 'src/features/events/infrastructure/event.repository'

describe('[infrastructure] product repository', () => {
  let eventRepositoryImplement: EventRepositoryImplement
  let databaseService: TestingDatabaseService
  let testingEntityService: TestingEntityService

  describe('listEvents', () => {
    it('should create product in database', async () => {
      const event1 = await testingEntityService.create(
        EventEntity,
        createEventModelFixture()
      )

      const result = await eventRepositoryImplement.listEvents()

      expect(result).toEqual([event1])
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
