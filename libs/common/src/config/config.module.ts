import { Module } from '@nestjs/common'
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config'
import { z } from 'zod'

@Module({
  imports: [NestConfigModule.forRoot({
    validate: (env) => z.object({
      DATABASE_URI: z.string(),
      PORT: z.coerce.number().default(3000)
    }).parse(env)
  })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule { }
