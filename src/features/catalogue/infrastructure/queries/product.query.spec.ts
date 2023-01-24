import { CqrsModule } from '@nestjs/cqrs'
import { TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { TestingEntityService } from 'src/_packages/testing/testing-entity.service'
import { bootstrap } from 'src/_packages/testing/utilities'
import { ProductFactory } from 'src/features/catalogue/domain/product/product.factory'
import { getProductDataFixture } from 'src/features/catalogue/domain/product/product.model.fixtures'
import { ProductEntity } from 'src/features/catalogue/infrastructure/entities/product.entity'
import { ProductQueryImplement } from 'src/features/catalogue/infrastructure/queries/product.query'

describe('[infrastructure] product repository', () => {
  let productQueryImplement: ProductQueryImplement
  let databaseService: TestingDatabaseService
  let testingEntityService: TestingEntityService

  beforeAll(async () => {
    const moduleRef: TestingModule = await bootstrap({
      imports: [CqrsModule, TypeOrmModule.forFeature([ProductEntity])],
      providers: [ProductQueryImplement, ProductFactory],
    })

    productQueryImplement = moduleRef.get(ProductQueryImplement)
    databaseService = moduleRef.get(TestingDatabaseService)
    testingEntityService = moduleRef.get(TestingEntityService)
  })

  afterEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.connection.close()
  })

  describe('findProduct', () => {
    it('should find products in database', async () => {
      await testingEntityService.create(ProductEntity, getProductDataFixture())
      await testingEntityService.create(ProductEntity, getProductDataFixture())

      const result = await productQueryImplement.findProducts()

      expect(result).toHaveLength(2)
    })

    describe('when offset', () => {
      it('should find products in database', async () => {
        await testingEntityService.create(
          ProductEntity,
          getProductDataFixture()
        )
        const product2 = await testingEntityService.create(
          ProductEntity,
          getProductDataFixture()
        )
        const product3 = await testingEntityService.create(
          ProductEntity,
          getProductDataFixture()
        )

        const result = await productQueryImplement.findProducts(1)

        expect(result).toMatchObject([product2, product3])
      })
    })

    describe('when limit', () => {
      it('should find products in database', async () => {
        const product1 = await testingEntityService.create(
          ProductEntity,
          getProductDataFixture()
        )
        await testingEntityService.create(
          ProductEntity,
          getProductDataFixture()
        )
        await testingEntityService.create(
          ProductEntity,
          getProductDataFixture()
        )

        const result = await productQueryImplement.findProducts(undefined, 1)

        expect(result).toMatchObject([product1])
      })
    })
  })
})
