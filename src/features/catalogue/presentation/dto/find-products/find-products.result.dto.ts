import { ApiProperty } from '@nestjs/swagger'
import { ProductsResult } from 'src/features/catalogue/application/result.types'
import { ProductItem } from 'src/features/catalogue/presentation/dto/product.result.dto'

export class FindProductsResultDTO {
  @ApiProperty({ type: [ProductItem] })
  readonly products: ProductsResult
}
