import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsController } from './controllers/products/products.controller'
import { ProductEntity } from './entities/product/product.entity'
import { ProductRepository } from './entities/product/product.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductRepository],
  exports: [],
})
export class ProductsModule {}
