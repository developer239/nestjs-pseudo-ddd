import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { UserDTO } from 'src/features/auth/presentation/dto/user.dto'

export class EventDTO {
  @ApiProperty({
    example: 1,
  }) readonly id: number

  @ApiProperty({
    example: 'Event 1',
  }) @IsString() @IsNotEmpty() readonly title: string

  @ApiProperty({
    example: 'Event 1 description',
  }) @IsString() @IsNotEmpty() readonly description: string

  @ApiProperty({
    example: '2020-01-01T00:00:00.000Z',
  }) @IsDate() readonly startsAt: Date

  @ApiProperty({
    example: 10,
  }) @IsNumber() readonly capacity: number

  @ApiProperty() readonly owner: UserDTO

  @ApiProperty({ isArray: true }) readonly attendees: UserDTO
}
