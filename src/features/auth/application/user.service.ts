import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcryptjs'
import { CryptoService } from 'src/features/auth/application/crypto.service'
import { IJwtPayload } from 'src/features/auth/application/jwt.types'
import { UserModel } from 'src/features/auth/domain/user.model'
import { UserRepository } from 'src/features/auth/domain/user.repository'
import { CredentialsDTO } from 'src/features/auth/presentation/dto/credentials.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService
  ) {}

  async signUp(credentialsDTO: CredentialsDTO): Promise<UserModel> {
    const salt = await bcrypt.genSalt()
    const password = await this.cryptoService.hashPassword(
      credentialsDTO.password,
      salt
    )

    const createDTO = {
      username: credentialsDTO.username,
      salt,
      password,
    }

    return this.userRepository.signUp(createDTO)
  }

  async signIn(
    credentialsDTO: CredentialsDTO
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByUsername(
      credentialsDTO.username
    )

    const isPasswordValid = await this.cryptoService.validatePassword(
      credentialsDTO.password,
      user.password,
      user.salt
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: IJwtPayload = { username: credentialsDTO.username }
    const accessToken = this.jwtService.sign(payload)

    return { accessToken }
  }
}
