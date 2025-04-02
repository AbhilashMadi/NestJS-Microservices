import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '~app/common/config/config.module'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
        onConnectionCreate: () => console.info('Connection for the database is created: 🔥\n'),
      }),

      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models)
  }
}
