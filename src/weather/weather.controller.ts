import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseInterceptors,
  ParseFloatPipe,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { SelectCurrentWeatherInterceptor } from 'src/common/interceptors/weather.interceptor';
import { WeatherTimeframe } from 'src/constants/enums/weather';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async create(@Body() createWeatherDto: CreateWeatherDto) {
    return await this.weatherService.unique(createWeatherDto);
  }

  @UseInterceptors(SelectCurrentWeatherInterceptor)
  @Get()
  async getWeather(
    @Query('lat', new ParseFloatPipe()) lat: number,
    @Query('lon', new ParseFloatPipe()) lon: number,
    @Query('part') part: WeatherTimeframe,
  ) {
    return await this.weatherService.getWeather({ lat, lon, part });
  }
}
