import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/features/auth/infrastructure/user.entity'
import { EventsService } from 'src/features/events/application/event.service'
import { EventRepository } from 'src/features/events/domain/event.repository'
import { EventEntity } from 'src/features/events/infrastructure/event.entity'
import { EventRepositoryImplement } from 'src/features/events/infrastructure/event.repository'
import { EventController } from 'src/features/events/presentation/event.controller'

const infrastructure: Provider[] = [
  {
    provide: EventRepository,
    useClass: EventRepositoryImplement,
  },
]

const domain = []

const application = [EventsService]

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, UserEntity])],
  controllers: [EventController],
  providers: [...application, ...domain, ...infrastructure],
  exports: [],
})
export class EventsModule {}
