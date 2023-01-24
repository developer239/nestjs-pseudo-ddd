import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateProductController } from 'src/features/products/presentation/products/create-product/products.controller'
import { FindProductsController } from 'src/features/products/presentation/products/find-products/products.controller'
import { ProductEntity } from 'src/features/products/infrastructure/product/product.entity'
import { ProductRepository } from 'src/features/products/infrastructure/product/product.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [CreateProductController, FindProductsController],
  providers: [ProductRepository],
  exports: [],
})
export class ProductsModule {}
