/* eslint-disable no-await-in-loop */
import { Injectable } from '@nestjs/common'
import { Connection, getConnection } from 'typeorm'

@Injectable()
export class TestingDatabaseService {
  // TODO: use injection instead
  constructor(public connection: Connection = getConnection()) {}

  public async clearDb() {
    const entities = this.connection.entityMetadatas

    for (const entity of entities) {
      const repository = this.connection.getRepository(entity.name)
      await repository.query(
        `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE`
      )
    }
  }
}
