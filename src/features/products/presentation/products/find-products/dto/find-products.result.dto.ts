import { ApiProperty } from '@nestjs/swagger'
import { ProductModelDTO } from 'src/features/products/presentation/products/product.dto'

export class FindProductsResultDTO {
  @ApiProperty({ type: [ProductModelDTO] }) readonly products: ProductModelDTO[]
}
