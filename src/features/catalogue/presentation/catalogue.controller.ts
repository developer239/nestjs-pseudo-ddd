import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { CreateProductCommand } from 'src/features/catalogue/application/commands/create-product.command'
import { FindProductsQuery } from 'src/features/catalogue/application/queries/find-products/find-products.query'
import { CreateProductBodyDTO } from 'src/features/catalogue/presentation/dto/create-product/create-product.body.dto'
import { CreateProductResultDTO } from 'src/features/catalogue/presentation/dto/create-product/create-product.result.dto'
import { FindProductsQueryDTO } from 'src/features/catalogue/presentation/dto/find-products/find-products.query.dto'
import { FindProductsResultDTO } from 'src/features/catalogue/presentation/dto/find-products/find-products.result.dto'
import { ResponseDescription } from 'src/features/catalogue/presentation/response-description'

@Controller('catalogue')
export class CatalogueController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

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
  async findProducts(@Query() queryDto: FindProductsQueryDTO) {
    const query = new FindProductsQuery(queryDto.offset, queryDto.limit)
    const products = await this.queryBus.execute(query)
    return { products }
  }

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
    const command = new CreateProductCommand(
      body.name,
      body.description,
      body.price
    )
    return this.commandBus.execute(command)
  }
}
