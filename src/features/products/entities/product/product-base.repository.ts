import { Injectable } from '@nestjs/common'
import { BaseRepository } from 'src/_packages/core/entities/base.repository'
import { ProductEntity } from 'src/features/products/entities/product/product.entity'
import {
  ProductModel,
  ProductProperties,
  UnsavedProductProperties,
} from 'src/features/products/models/product/product.model'

@Injectable()
export class ProductBaseRepository extends BaseRepository<
  ProductEntity,
  ProductModel
> {
  public entityToModel(entity: ProductEntity): ProductModel {
    return this.entityToModelBase(entity, ProductModel)
  }

  public propertiesToEntity(
    properties: UnsavedProductProperties | ProductProperties
  ): ProductEntity {
    return this.propertiesToEntityBase(properties, ProductEntity)
  }
}
