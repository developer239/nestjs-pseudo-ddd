import { TestingModule } from '@nestjs/testing'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { TestingEntityService } from 'src/_packages/testing/testing-entity.service'
import { bootstrap } from 'src/_packages/testing/utilities'
import { FindProductsBodyDTO } from 'src/features/products/presentation/products/find-products/dto/find-products.body.dto'
import { FindProductsController } from 'src/features/products/presentation/products/find-products/products.controller'
import { ProductEntity } from 'src/features/products/infrastructure/product/product.entity'
import { ProductModel } from 'src/features/products/domain/product/product.model'
import { ProductModelFixtures } from 'src/features/products/domain/product/product.model.fixtures'
import { ProductsModule } from 'src/features/products/products.module'

describe('[controllers] products controller', () => {
  let controllerToTest: FindProductsController
  let databaseService: TestingDatabaseService
  let testingEntityService: TestingEntityService

  beforeAll(async () => {
    const moduleRef: TestingModule = await bootstrap({
      imports: [ProductsModule],
    })

    await moduleRef.init()

    databaseService = moduleRef.get(TestingDatabaseService)
    testingEntityService = moduleRef.get(TestingEntityService)
    controllerToTest = moduleRef.get(FindProductsController)
  })

  afterEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.connection.close()
  })

  describe('findProducts', () => {
    it('should find products in database', async () => {
      const productEntity1 = await testingEntityService.create(
        ProductEntity,
        ProductModelFixtures.getData()
      )
      const productEntity2 = await testingEntityService.create(
        ProductEntity,
        ProductModelFixtures.getData()
      )

      const result = await controllerToTest.findProducts(
        new FindProductsBodyDTO()
      )

      expect(result).toStrictEqual({
        products: [
          new ProductModel({
            id: productEntity1.id,
            name: productEntity1.name,
            description: productEntity1.description,
            price: productEntity1.price,
          }),
          new ProductModel({
            id: productEntity2.id,
            name: productEntity2.name,
            description: productEntity2.description,
            price: productEntity2.price,
          }),
        ],
      })
    })
  })
})
