import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateProductHandler } from 'src/features/catalogue/application/commands/create-product.handler'
import { FindProductsHandler } from 'src/features/catalogue/application/queries/find-products/find-products.handler'
import { ProductFactory } from 'src/features/catalogue/domain/product/product.factory'
import { ProductQuery } from 'src/features/catalogue/domain/product/product.query'
import { ProductRepository } from 'src/features/catalogue/domain/product/product.repository'
import { ProductEntity } from 'src/features/catalogue/infrastructure/entities/product.entity'
import { ProductQueryImplement } from 'src/features/catalogue/infrastructure/queries/product.query'
import { ProductRepositoryImplement } from 'src/features/catalogue/infrastructure/repositories/product.repository'
import { CatalogueController } from 'src/features/catalogue/presentation/catalogue.controller'

const infrastructure: Provider[] = [
  {
    provide: ProductRepository,
    useClass: ProductRepositoryImplement,
  },
  {
    provide: ProductQuery,
    useClass: ProductQueryImplement,
  },
]

const domain = [ProductFactory]

const application = [FindProductsHandler, CreateProductHandler]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ProductEntity])],
  controllers: [CatalogueController],
  providers: [...application, ...domain, ...infrastructure],
  exports: [],
})
export class CatalogueModule {}
