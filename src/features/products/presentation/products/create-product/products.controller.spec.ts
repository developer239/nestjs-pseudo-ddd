import { TestingModule } from '@nestjs/testing'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { bootstrap } from 'src/_packages/testing/utilities'
import { CreateProductBodyDTO } from 'src/features/products/presentation/products/create-product/dto/create-product.body.dto'
import { CreateProductController } from 'src/features/products/presentation/products/create-product/products.controller'
import { ProductModel } from 'src/features/products/domain/product/product.model'
import { ProductModelFixtures } from 'src/features/products/domain/product/product.model.fixtures'
import { ProductsModule } from 'src/features/products/products.module'

describe('[controllers] products controller', () => {
  let controllerToTest: CreateProductController
  let databaseService: TestingDatabaseService

  beforeAll(async () => {
    const moduleRef: TestingModule = await bootstrap({
      imports: [ProductsModule],
    })

    await moduleRef.init()

    databaseService = moduleRef.get(TestingDatabaseService)
    controllerToTest = moduleRef.get(CreateProductController)
  })

  afterEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.connection.close()
  })

  describe('createProduct', () => {
    it('should create new product', async () => {
      const productData = ProductModelFixtures.getData()

      const createProductBodyDto = new CreateProductBodyDTO()
      createProductBodyDto.name = productData.name
      createProductBodyDto.description = productData.description
      createProductBodyDto.price = productData.price

      const result = await controllerToTest.createProduct(createProductBodyDto)

      expect(result).toStrictEqual(
        new ProductModel({
          id: result.properties().id,
          name: productData.name,
          description: productData.description,
          price: productData.price,
        })
      )
    })
  })
})
