import { BaseEntity, Repository } from 'typeorm'

interface IModelProperties {
  [key: string]: any
}

export abstract class BaseRepository<
  TEntity extends BaseEntity,
  TModel
> extends Repository<TEntity> {
  public abstract propertiesToEntity(properties: IModelProperties): TEntity

  public abstract entityToModel(entity: TEntity): TModel
}
