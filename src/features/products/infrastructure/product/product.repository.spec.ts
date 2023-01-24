import { TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestingDatabaseService } from 'src/_packages/testing/testing-database.service'
import { TestingEntityService } from 'src/_packages/testing/testing-entity.service'
import { bootstrap } from 'src/_packages/testing/utilities'
import { ProductModelFixtures } from 'src/features/products/domain/product/product.model.fixtures'
import { ProductEntity } from 'src/features/products/infrastructure/product/product.entity'
import { ProductRepository } from 'src/features/products/infrastructure/product/product.repository'

describe('[entities] product repository', () => {
  let productRepository: ProductRepository
  let databaseService: TestingDatabaseService
  let testingEntityService: TestingEntityService

  beforeAll(async () => {
    const moduleRef: TestingModule = await bootstrap({
      imports: [TypeOrmModule.forFeature([ProductEntity])],
      providers: [ProductRepository],
    })

    productRepository = moduleRef.get(ProductRepository)
    databaseService = moduleRef.get(TestingDatabaseService)
    testingEntityService = moduleRef.get(TestingEntityService)
  })

  afterEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.connection.close()
  })

  describe('createProduct', () => {
    it('should create product in database', async () => {
      const productData = ProductModelFixtures.getData()
      const result = await productRepository.createProduct(productData)

      expect(result).toMatchObject(productData)
    })
  })

  describe('findProduct', () => {
    it('should find products in database', async () => {
      await testingEntityService.create(
        ProductEntity,
        ProductModelFixtures.getData()
      )
      await testingEntityService.create(
        ProductEntity,
        ProductModelFixtures.getData()
      )

      const result = await productRepository.findProducts()

      expect(result).toHaveLength(2)
    })

    describe('when offset', () => {
      it('should find products in database', async () => {
        await testingEntityService.create(
          ProductEntity,
          ProductModelFixtures.getData()
        )
        const entity2 = await testingEntityService.create(
          ProductEntity,
          ProductModelFixtures.getData()
        )
        const entity3 = await testingEntityService.create(
          ProductEntity,
          ProductModelFixtures.getData()
        )

        const product2 = productRepository.entityToModel(entity2)
        const product3 = productRepository.entityToModel(entity3)

        const result = await productRepository.findProducts(1)

        expect(result).toStrictEqual([product2, product3])
      })
    })

    describe('when limit', () => {
      it('should find products in database', async () => {
        const entity1 = await testingEntityService.create(
          ProductEntity,
          ProductModelFixtures.getData()
        )
        await testingEntityService.create(
          ProductEntity,
          ProductModelFixtures.getData()
        )
        await testingEntityService.create(
          ProductEntity,
          ProductModelFixtures.getData()
        )

        const result = await productRepository.findProducts(undefined, 1)

        const product1 = productRepository.entityToModel(entity1)

        expect(result).toStrictEqual([product1])
      })
    })
  })
})
