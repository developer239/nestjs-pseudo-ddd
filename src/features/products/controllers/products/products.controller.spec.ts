import { TestingModule } from '@nestjs/testing'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { TestingEntityService } from 'src/_packages/testing/testing-entity.service'
import { bootstrap } from 'src/_packages/testing/utilities'
import { CreateProductBodyDTO } from 'src/features/products/controllers/products/dto/create-product.body.dto'
import { FindProductsBodyDto } from 'src/features/products/controllers/products/dto/find-products.body.dto'
import { ProductsController } from 'src/features/products/controllers/products/products.controller'
import { ProductEntity } from 'src/features/products/entities/product/product.entity'
import { ProductModel } from 'src/features/products/models/product/product.model'
import { ProductModelFixtures } from 'src/features/products/models/product/product.model.fixtures'
import { ProductsModule } from 'src/features/products/products.module'

describe('[presentation] products controller', () => {
  let controllerToTest: ProductsController
  let databaseService: TestingDatabaseService
  let testingEntityService: TestingEntityService

  beforeAll(async () => {
    const moduleRef: TestingModule = await bootstrap({
      imports: [ProductsModule],
    })

    await moduleRef.init()

    databaseService = moduleRef.get(TestingDatabaseService)
    testingEntityService = moduleRef.get(TestingEntityService)
    controllerToTest = moduleRef.get(ProductsController)
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
        new FindProductsBodyDto()
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
