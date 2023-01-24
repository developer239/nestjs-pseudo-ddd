import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindProductsQuery } from 'src/features/catalogue/application/queries/find-products/find-products.query'
import { ProductsResult } from 'src/features/catalogue/application/result.types'
import { ProductQuery } from 'src/features/catalogue/domain/product/product.query'

@QueryHandler(FindProductsQuery)
export class FindProductsHandler
  implements IQueryHandler<FindProductsQuery, ProductsResult>
{
  constructor(readonly productQuery: ProductQuery) {}

  async execute(query: FindProductsQuery): Promise<ProductsResult> {
    const products = await this.productQuery.findProducts(
      query.offset,
      query.limit
    )

    return products.map((product) => product.properties())
  }
}
