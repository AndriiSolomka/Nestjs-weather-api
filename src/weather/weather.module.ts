import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FetchModule } from 'src/fetch/fetch.module';

@Module({
  imports: [PrismaModule, FetchModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
