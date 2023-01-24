import { Module } from '@nestjs/common'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { TestingEntityService } from 'src/_packages/testing/testing-entity.service'

@Module({
  imports: [],
  providers: [TestingEntityService, TestingDatabaseService],
  exports: [TestingEntityService, TestingDatabaseService],
})
export class TestingModule {}
