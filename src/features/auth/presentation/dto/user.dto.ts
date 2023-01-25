import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserDTO {
  @ApiProperty({
    example: 1,
  })
  readonly id: number

  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  readonly email: string
}
