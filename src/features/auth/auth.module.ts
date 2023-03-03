import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from 'src/features/auth/application/user.service'
import { UserRepository } from 'src/features/auth/domain/user.repository'
import { UserEntity } from 'src/features/auth/infrastructure/user.entity'
import { UserRepositoryImplement } from 'src/features/auth/infrastructure/user.repository'
import { AuthController } from 'src/features/auth/presentation/auth.controller'

const infrastructure: Provider[] = [
  {
    provide: UserRepository,
    useClass: UserRepositoryImplement,
  },
]

const domain = []

const application = [UserService]

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [...application, ...domain, ...infrastructure],
  exports: [],
})
export class AuthModule {}
