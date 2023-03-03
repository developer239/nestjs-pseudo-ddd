import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class CryptoService {
  async validatePassword(
    testPassword: string,
    hashedPassword: string,
    salt: string
  ): Promise<boolean> {
    const hash = await bcrypt.hash(testPassword, salt)

    return hash === hashedPassword
  }

  hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
