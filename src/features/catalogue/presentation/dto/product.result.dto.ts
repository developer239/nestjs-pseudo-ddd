import { ApiProperty } from '@nestjs/swagger'
import { ProductResult } from 'src/features/catalogue/application/result.types'

export class ProductItem extends ProductResult {
  @ApiProperty({ format: 'uuid' }) readonly id: string

  @ApiProperty({ example: 'Jacuzzi' }) readonly name: string

  @ApiProperty({ example: 'So that you can have fun after work.' })
  readonly description: string

  @ApiProperty({ example: 42 }) readonly price: number
}
