import { UserModel } from 'src/features/auth/domain/user.model'
import { CreateUserDTO } from '../presentation/dto/createUser.dto'

export abstract class UserRepository {
  public abstract findByUsername(username: string): Promise<UserModel>

  public abstract signUp(user: CreateUserDTO): Promise<UserModel>
}
