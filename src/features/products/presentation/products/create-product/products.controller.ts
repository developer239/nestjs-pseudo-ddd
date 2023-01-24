import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { ResponseDescription } from 'src/_packages/core/controllers/response-description'
import { CreateProductBodyDTO } from 'src/features/products/presentation/products/create-product/dto/create-product.body.dto'
import { CreateProductResultDTO } from 'src/features/products/presentation/products/create-product/dto/create-product.result.dto'
import { ProductRepository } from 'src/features/products/infrastructure/product/product.repository'

@Controller('products')
export class CreateProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: ResponseDescription.CREATED,
    type: CreateProductResultDTO,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  @UsePipes(ValidationPipe)
  createProduct(@Body() body: CreateProductBodyDTO) {
    return this.productRepository.createProduct(body)
  }
}
