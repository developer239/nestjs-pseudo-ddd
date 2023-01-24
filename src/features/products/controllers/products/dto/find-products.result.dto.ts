import { ApiProperty } from '@nestjs/swagger'
import { ProductModel } from 'src/features/products/models/product/product.model'

export class FindProductsResultDto {
  @ApiProperty({ type: [ProductModel] }) readonly products: ProductModel[]
}
