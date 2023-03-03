import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UserService } from 'src/features/auth/application/user.service'
import { UserModel } from 'src/features/auth/domain/user.model'
import { CredentialsDTO } from 'src/features/auth/presentation/dto/credentials.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserModel,
  })
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: CredentialsDTO
  ): Promise<UserModel> {
    return this.userService.signUp(authCredentialsDto)
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
      },
    },
  })
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: CredentialsDTO
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialsDto)
  }
}
