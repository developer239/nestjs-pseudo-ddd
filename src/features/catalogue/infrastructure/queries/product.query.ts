import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm';
import { ProductFactory } from 'src/features/catalogue/domain/product/product.factory'
import { IProductModel } from 'src/features/catalogue/domain/product/product.model'
import { ProductQuery } from 'src/features/catalogue/domain/product/product.query'
import { ProductEntity } from 'src/features/catalogue/infrastructure/entities/product.entity'

@Injectable()
export class ProductQueryImplement
  extends Repository<ProductEntity>
  implements ProductQuery
{
  constructor(private readonly productFactory: ProductFactory, private readonly dataSource: DataSource) {
    // TODO: double check typescript error
    // @ts-ignore
    super()
  }

  async findProducts(
    offset?: number,
    limit?: number
  ): Promise<IProductModel[]> {
    const products = await this.dataSource.getRepository(ProductEntity)
      .createQueryBuilder('product')
      .offset(offset)
      .limit(limit)
      .getMany()

    return products.map((product) => this.entityToModel(product))
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
