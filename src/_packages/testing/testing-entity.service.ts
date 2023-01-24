/* eslint-disable security/detect-object-injection */
import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { instanceToInstance } from 'class-transformer'
import { DataSource } from 'typeorm/data-source/DataSource'
import { BaseEntity } from '../core/entities/base.entity'

type IConstructorOf<TEntity> = new () => TEntity

// https://github.com/typeorm/typeorm/issues/4591
const fixEntity = (entity: any) => {
  delete entity.createdAt
  delete entity.deletedAt
  delete entity.updatedAt

  const keys = Object.keys(entity)
  for (const key of keys) {
    if (typeof entity[key] === 'object') {
      fixEntity(entity[key])
    }
  }
}

@Injectable()
export class TestingEntityService {
  constructor(@InjectDataSource() public dataSource: DataSource) {}

  public async create<TEntity extends BaseEntity, TData>(
    model: IConstructorOf<TEntity>,
    data?: TData
  ): Promise<TEntity> {
    const instance = new model()

    if (data) {
      const keys = Object.keys(data)
      for (const key of keys) {
        instance[key] = data[key]
      }
    }

    await instance.save()

    const entity = instanceToInstance(instance)

    fixEntity(entity)

    return entity
  }

  public list<TEntity extends BaseEntity>(
    entityClass: string
  ): Promise<TEntity[]> {
    return this.dataSource.manager.find<TEntity>(entityClass)
  }
}
