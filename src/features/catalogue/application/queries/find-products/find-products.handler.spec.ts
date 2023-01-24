import { Test } from '@nestjs/testing'
import { FindProductsHandler } from 'src/features/catalogue/application/queries/find-products/find-products.handler'
import { FindProductsQuery } from 'src/features/catalogue/application/queries/find-products/find-products.query'
import { ProductResult } from 'src/features/catalogue/application/result.types'
import { getProductModelFixture } from 'src/features/catalogue/domain/product/product.model.fixtures'
import { ProductQuery } from 'src/features/catalogue/domain/product/product.query'

describe('[application] FindProductsHandler', () => {
  let handler: FindProductsHandler
  let productQuery: ProductQuery

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindProductsHandler,
        {
          provide: ProductQuery,
          useValue: {},
        },
      ],
    }).compile()

    handler = moduleRef.get(FindProductsHandler)
    productQuery = moduleRef.get(ProductQuery)
  })

  describe('execute', () => {
    it('should return products', async () => {
      const product = getProductModelFixture()
      productQuery.findProducts = jest.fn().mockResolvedValue([product])

      const query = new FindProductsQuery(0, 1)

      const result = await handler.execute(query)
      const productResult = new ProductResult(
        product.properties().id,
        product.properties().name,
        product.properties().description,
        product.properties().price
      )

      expect(result).toMatchObject([productResult])
      expect(productQuery.findProducts).toHaveBeenCalledTimes(1)
      expect(productQuery.findProducts).toHaveBeenCalledWith(
        query.offset,
        query.limit
      )
    })
  })
})
