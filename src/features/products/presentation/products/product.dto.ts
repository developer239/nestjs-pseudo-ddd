import { ApiProperty } from '@nestjs/swagger'

export class ProductModelDTO {
  @ApiProperty({ format: 'number' })
  private readonly id: number

  @ApiProperty({ example: 'Jacuzzi' })
  private readonly name: string

  @ApiProperty({ example: 'So that you can have fun after work.' })
  private readonly price: number

  @ApiProperty({ example: 42 })
  private readonly description: string
}
