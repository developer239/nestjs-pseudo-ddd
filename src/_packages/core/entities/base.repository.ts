/* eslint-disable security/detect-object-injection */
import { BaseEntity, Repository } from 'typeorm'
import { BaseModel } from '../models/base.model'

interface IModelProperties {
  [key: string]: any
}

export abstract class BaseRepository<
  TEntity extends BaseEntity,
  TModel extends BaseModel<{}, {}, {}>
> extends Repository<TEntity> {
  // TODO: use reflection
  protected propertiesToEntityBase(
    properties: IModelProperties,
    entityClass: any
  ): TEntity {
    const entity = new entityClass()

    for (const key of Object.keys(properties)) {
      entity[key] = properties[key]
    }

    return entity
  }

  // TODO: use reflection
  protected entityToModelBase(
    entity: TEntity,
    model: any,
    // TODO: use class transformer
    skipProperties = ['createdAt', 'updatedAt', 'deletedAt']
  ): TModel {
    const modelInstance = new model()

    for (const key of Object.keys(entity)) {
      let shouldSkip = false

      for (const skipProperty of skipProperties) {
        if (key === skipProperty) {
          shouldSkip = true
          break
        }
      }

      if (!shouldSkip) {
        // @ts-ignore
        modelInstance[key] = entity[key]
      }
    }

    return modelInstance
  }

  public abstract propertiesToEntity(properties: IModelProperties): TEntity

  public abstract entityToModel(entity: TEntity): TModel
}
