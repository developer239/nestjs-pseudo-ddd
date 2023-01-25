import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/_packages/database/database.module'
import { EnvironmentModule } from 'src/_packages/env/env.module'
import { EventsModule } from 'src/features/events/events.module'

@Module({
  imports: [
    EnvironmentModule.register({
      NODE_ENV: process.env.NODE_ENV as 'production' | 'development' | 'test',
    }),
    DatabaseModule.register(),
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
