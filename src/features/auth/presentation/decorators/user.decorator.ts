import { createParamDecorator } from '@nestjs/common'
import { UserModel } from 'src/features/auth/domain/user.model'

export const GetUser = createParamDecorator((data, req): UserModel => req.user)
