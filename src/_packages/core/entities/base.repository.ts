import { BaseEntity, Repository } from 'typeorm'

interface IModelProperties {
  [key: string]: any
}

export abstract class BaseRepository<
  TEntity extends BaseEntity,
  TModel
> extends Repository<TEntity> {
  protected abstract propertiesToEntity(properties: IModelProperties): TEntity

  protected abstract entityToModel(entity: TEntity): TModel
}
