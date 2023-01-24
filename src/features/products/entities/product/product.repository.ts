import { Inject, Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { ProductBaseRepository } from 'src/features/products/entities/product/product-base.repository'
import { ProductEntity } from 'src/features/products/entities/product/product.entity'
import {
  UnsavedProductProperties,
  ProductModel,
} from 'src/features/products/models/product/product.model'
import { ProductsCollection } from 'src/features/products/models/product/products.collection'

@Injectable()
export class ProductRepository extends ProductBaseRepository {
  @Inject(DataSource) private readonly dataSource: DataSource

  async findProducts(
    offset?: number,
    limit?: number
  ): Promise<ProductsCollection> {
    const products = await this.dataSource
      .getRepository(ProductEntity)
      .createQueryBuilder('product')
      .offset(offset)
      .limit(limit)
      .getMany()

    return new ProductsCollection(
      products.map((productEntity) => this.entityToModel(productEntity))
    )
  }

  async createProduct(
    properties: UnsavedProductProperties
  ): Promise<ProductModel> {
    const productEntity = this.propertiesToEntity(properties)

    await productEntity.save()

    return this.entityToModel(productEntity)
  }
}
