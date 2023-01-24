import { ApiProperty } from '@nestjs/swagger'
import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

export class CreateProductBodyDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ minLength: 2, maxLength: 20, example: 'Beer tap' })
  name: string

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({
    minLength: 2,
    maxLength: 100,
    example: 'So that you have something to drink in Jacuzzi',
  })
  description: string

  @IsNumber()
  @Min(1)
  @Max(99999)
  @ApiProperty({ minimum: 1, maximum: 99999, example: 47 })
  price: number
}
