import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
  @ApiProperty() @IsNotEmpty() username: string

  @IsNotEmpty() salt: string

  @ApiProperty() @IsNotEmpty() password: string
}
