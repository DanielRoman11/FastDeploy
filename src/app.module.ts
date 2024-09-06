import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecipeModule } from './recipe/recipe.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get('CACHE_HOST'),
            port: Number(configService.get('CACHE_PORT')),
          },
          ttl: Number(configService.get('CACHE_TTL')),
        }),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    RecipeModule,
  ],
})
export class AppModule {}
