import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

const filePath = {
  production: '.env.production',
  development: '.env.development',
  test: '.env.test',
}

export interface IConfig {
  NODE_ENV: keyof typeof filePath
  validationSchema?: any
}

@Module({})
export class EnvironmentModule {
  static register(config?: IConfig) {
    const envFilePath = filePath[config?.NODE_ENV as keyof typeof filePath]

    // TODO: improve error handling
    if (!envFilePath) {
      throw Error('Invalid .env file path')
    }

    return {
      module: EnvironmentModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath,
          validationSchema: config?.validationSchema,
        }),
      ],
      providers: [],
      exports: [],
    }
  }
}
