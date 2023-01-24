import { CqrsModule } from '@nestjs/cqrs'
import { TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { bootstrap } from 'src/_packages/testing/utilities'
import { ProductFactory } from 'src/features/catalogue/domain/product/product.factory'
import { getProductDataFixture } from 'src/features/catalogue/domain/product/product.model.fixtures'
import { ProductEntity } from 'src/features/catalogue/infrastructure/entities/product.entity'
import { ProductRepositoryImplement } from 'src/features/catalogue/infrastructure/repositories/product.repository'

describe('[infrastructure] product repository', () => {
  let productRepositoryImplement: ProductRepositoryImplement
  let databaseService: TestingDatabaseService

  beforeAll(async () => {
    const moduleRef: TestingModule = await bootstrap({
      imports: [CqrsModule, TypeOrmModule.forFeature([ProductEntity])],
      providers: [ProductRepositoryImplement, ProductFactory],
    })

    productRepositoryImplement = moduleRef.get(ProductRepositoryImplement)
    databaseService = moduleRef.get(TestingDatabaseService)
  })

  afterEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.connection.close()
  })

  describe('createProduct', () => {
    it('should create product in database', async () => {
      const productData = getProductDataFixture()
      const result = await productRepositoryImplement.createProduct(productData)

      expect(result).toMatchObject(productData)
    })
  })
})
