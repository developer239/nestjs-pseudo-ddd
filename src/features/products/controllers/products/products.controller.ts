import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { ResponseDescription } from 'src/_packages/core/controllers/response-description'
import { CreateProductBodyDTO } from 'src/features/products/controllers/products/dto/create-product.body.dto'
import { CreateProductResultDto } from 'src/features/products/controllers/products/dto/create-product.result.dto'
import { FindProductsBodyDto } from 'src/features/products/controllers/products/dto/find-products.body.dto'
import { FindProductsResultDto } from 'src/features/products/controllers/products/dto/find-products.result.dto'
import { ProductRepository } from 'src/features/products/entities/product/product.repository'

@Controller('products')
export class ProductsController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: ResponseDescription.OK,
    type: FindProductsResultDto,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findProducts(@Query() queryDto: FindProductsBodyDto) {
    const products = await this.productRepository.findProducts(
      queryDto.offset,
      queryDto.limit
    )

    return { products: products.getAll() }
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: ResponseDescription.CREATED,
    type: CreateProductResultDto,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  @UsePipes(ValidationPipe)
  async createProduct(@Body() body: CreateProductBodyDTO) {
    const product = await this.productRepository.createProduct(body)

    return product
  }
}
