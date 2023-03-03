import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { IJwtPayload } from 'src/features/auth/application/jwt.types'
import { UserModel } from 'src/features/auth/domain/user.model'
import { UserRepository } from 'src/features/auth/domain/user.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly envService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envService.get('JWT_SECRET'),
    })
  }

  async validate(payload: IJwtPayload): Promise<UserModel> {
    const { username } = payload
    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
