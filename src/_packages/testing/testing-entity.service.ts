/* eslint-disable security/detect-object-injection */
import { Injectable } from '@nestjs/common'
import { ClassTransformOptions, instanceToInstance } from 'class-transformer'
import { BaseEntity, Connection, getConnection } from 'typeorm'

type IConstructorOf<TEntity> = new () => TEntity

// TODO: remove when reintroduced
export function classToClass<TEntity>(
  object: TEntity,
  options?: ClassTransformOptions
): TEntity {
  return instanceToInstance(object, options)
}

@Injectable()
export class TestingEntityService {
  // TODO: use injection instead
  constructor(public connection: Connection = getConnection()) {}

  public async create<TEntity extends BaseEntity, TData>(
    model: IConstructorOf<TEntity>,
    data?: TData
  ): Promise<TEntity> {
    const instance = new model()

    // TODO: fix types
    // @ts-ignore
    for (const key of Object.keys(data)) {
      // TODO: fix types
      // @ts-ignore
      instance[key] = data[key]
    }

    await instance.save()

    return classToClass(instance)
  }

  public list<TEntity extends BaseEntity>(
    entityClass: string
  ): Promise<TEntity[]> {
    return this.connection.manager.find<TEntity>(entityClass)
  }
}
