import { Inject, Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { ProductBaseRepository } from 'src/features/products/infrastructure/product/product-base.repository'
import { ProductEntity } from 'src/features/products/infrastructure/product/product.entity'
import {
  UnsavedProductProperties,
  ProductModel,
} from 'src/features/products/domain/product/product.model'

@Injectable()
export class ProductRepository extends ProductBaseRepository {
  @Inject(DataSource) private readonly dataSource: DataSource

  async findProducts(offset?: number, limit?: number): Promise<ProductModel[]> {
    const products = await this.dataSource
      .getRepository(ProductEntity)
      .createQueryBuilder('product')
      .offset(offset)
      .limit(limit)
      .getMany()

    return products.map((productEntity) => this.entityToModel(productEntity))
  }

  async createProduct(
    properties: UnsavedProductProperties
  ): Promise<ProductModel> {
    const productEntity = this.propertiesToEntity(properties)

    await productEntity.save()

    return this.entityToModel(productEntity)
  }
}
