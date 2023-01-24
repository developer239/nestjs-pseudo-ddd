import { Injectable } from '@nestjs/common'
import { getManager, Repository } from 'typeorm'
import { ProductFactory } from 'src/features/catalogue/domain/product/product.factory'
import {
  IProductModel,
  ProductProperties,
} from 'src/features/catalogue/domain/product/product.model'
import { ProductRepository } from 'src/features/catalogue/domain/product/product.repository'
import { ProductEntity } from 'src/features/catalogue/infrastructure/entities/product.entity'

@Injectable()
export class ProductRepositoryImplement
  extends Repository<ProductEntity>
  implements ProductRepository
{
  constructor(private readonly productFactory: ProductFactory) {
    // TODO: double check typescript error
    // @ts-ignore
    super()
  }

  async createProduct(
    data: Omit<ProductProperties, 'id'>
  ): Promise<IProductModel> {
    const productEntity = new ProductEntity()
    productEntity.name = data.name
    productEntity.description = data.description
    productEntity.price = data.price

    const manager = getManager()
    await manager.save(productEntity)

    return this.entityToModel(productEntity)
  }

  public modelToEntity(model: IProductModel): ProductEntity {
    const properties = model.properties()

    const entity = new ProductEntity()
    entity.id = properties.id
    entity.name = properties.name
    entity.description = properties.description
    entity.price = properties.price

    return entity
  }

  public entityToModel(entity: ProductEntity): IProductModel {
    return this.productFactory.create({
      // TODO: double check typescript error
      // @ts-ignore
      id: entity.id!,
      ...entity,
    })
  }
}
