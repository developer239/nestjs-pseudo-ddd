import { CqrsModule } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'
import { CreateProductCommand } from 'src/features/catalogue/application/commands/create-product.command'
import { CreateProductHandler } from 'src/features/catalogue/application/commands/create-product.handler'
import { ProductResult } from 'src/features/catalogue/application/result.types'
import { getProductModelFixture } from 'src/features/catalogue/domain/product/product.model.fixtures'
import { ProductRepository } from 'src/features/catalogue/domain/product/product.repository'

describe('[application] CreateProductHandler', () => {
  let handler: CreateProductHandler
  let productRepository: ProductRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateProductHandler,
        {
          provide: ProductRepository,
          useValue: {},
        },
      ],
    }).compile()

    handler = moduleRef.get(CreateProductHandler)
    productRepository = moduleRef.get(ProductRepository)
  })

  describe('execute', () => {
    it('should create and return new product', async () => {
      const product = getProductModelFixture()
      productRepository.createProduct = jest.fn().mockResolvedValue(product)

      const command = new CreateProductCommand(
        product.properties().name,
        product.properties().description,
        product.properties().price
      )

      const result = await handler.execute(command)
      const productResult = new ProductResult(
        product.properties().id,
        product.properties().name,
        product.properties().description,
        product.properties().price
      )

      expect(result).toMatchObject(productResult)
    })
  })
})
