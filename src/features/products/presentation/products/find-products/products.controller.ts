import {
  Controller,
  Get,
  Query,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { ResponseDescription } from 'src/_packages/core/controllers/response-description'
import { FindProductsBodyDTO } from 'src/features/products/presentation/products/find-products/dto/find-products.body.dto'
import { FindProductsResultDTO } from 'src/features/products/presentation/products/find-products/dto/find-products.result.dto'
import { ProductRepository } from 'src/features/products/infrastructure/product/product.repository'

@Controller('products')
export class FindProductsController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: ResponseDescription.OK,
    type: FindProductsResultDTO,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findProducts(@Query() queryDto: FindProductsBodyDTO) {
    const products = await this.productRepository.findProducts(
      queryDto.offset,
      queryDto.limit
    )

    return { products }
  }
}
