import { TestingModule } from '@nestjs/testing'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { TestingEntityService } from 'src/_packages/testing/testing-entity.service'
import { bootstrap } from 'src/_packages/testing/utilities'
import { ProductResult } from 'src/features/catalogue/application/result.types'
import { CatalogueModule } from 'src/features/catalogue/catalogue.module'
import { getProductDataFixture } from 'src/features/catalogue/domain/product/product.model.fixtures'
import { ProductEntity } from 'src/features/catalogue/infrastructure/entities/product.entity'
import { CatalogueController } from 'src/features/catalogue/presentation/catalogue.controller'
import { CreateProductBodyDTO } from 'src/features/catalogue/presentation/dto/create-product/create-product.body.dto'
import { FindProductsQueryDTO } from 'src/features/catalogue/presentation/dto/find-products/find-products.query.dto'

describe('[presentation] catalogue controller', () => {
  let controllerToTest: CatalogueController
  let databaseService: TestingDatabaseService
  let testingEntityService: TestingEntityService

  beforeAll(async () => {
    const moduleRef: TestingModule = await bootstrap({
      imports: [CatalogueModule],
    })

    await moduleRef.init()

    databaseService = moduleRef.get(TestingDatabaseService)
    testingEntityService = moduleRef.get(TestingEntityService)
    controllerToTest = moduleRef.get(CatalogueController)
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
        getProductDataFixture()
      )
      const productEntity2 = await testingEntityService.create(
        ProductEntity,
        getProductDataFixture()
      )

      const result = await controllerToTest.findProducts(
        new FindProductsQueryDTO()
      )

      const productResult1 = new ProductResult(
        productEntity1.id,
        productEntity1.name,
        productEntity1.description,
        productEntity1.price
      )
      const productResult2 = new ProductResult(
        productEntity2.id,
        productEntity2.name,
        productEntity2.description,
        productEntity2.price
      )

      expect(result).toMatchObject({
        products: [productResult1, productResult2],
      })
    })
  })

  describe('createProduct', () => {
    it('should create new product', async () => {
      const productData = getProductDataFixture()

      const createProductBodyDto = new CreateProductBodyDTO()
      createProductBodyDto.name = productData.name
      createProductBodyDto.description = productData.description
      createProductBodyDto.price = productData.price

      const result = await controllerToTest.createProduct(createProductBodyDto)

      const productResult = new ProductResult(
        result.id,
        productData.name,
        productData.description,
        productData.price
      )

      expect(result).toMatchObject(productResult)
    })
  })
})
