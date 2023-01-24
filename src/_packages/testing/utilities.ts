import { ModuleMetadata } from '@nestjs/common/interfaces'
import { Test } from '@nestjs/testing'
import { DatabaseModule } from 'src/_packages/database/database.module'
import { EnvironmentModule } from 'src/_packages/env/env.module'
import { TestingModule } from 'src/_packages/testing/testing.module'

export const bootstrap = async (metadata: ModuleMetadata) => {
  const testingModule = await Test.createTestingModule({
    imports: [
      EnvironmentModule.register({
        NODE_ENV: 'test',
      }),
      DatabaseModule.register(),
      TestingModule,
      ...(metadata.imports ? metadata.imports : []),
    ],
    controllers: [...(metadata?.controllers ?? [])],
    providers: [...(metadata?.providers ?? [])],
    exports: [...(metadata?.exports ?? [])],
  }).compile()

  return testingModule
}
