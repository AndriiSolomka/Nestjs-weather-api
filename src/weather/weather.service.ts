import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FetchService } from 'src/fetch/fetch.service';
import { ConfigService } from '@nestjs/config';
import { IWeatherResponse } from 'src/constants/interfaces/weather';
import { WeatherData } from '@prisma/client';

@Injectable()
export class WeatherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fetch: FetchService,
    private readonly config: ConfigService,
  ) {}

  buildUrl(data: CreateWeatherDto): string {
    const baseUrl = this.config.get<string>('OPENWEATHER_API_URL');
    const apiKey = this.config.get<string>('OPENWEATHER_API_KEY');
    return `${baseUrl}lat=${data.lat}&lon=${data.lon}&exclude=${data.part}&appid=${apiKey}`;
  }

  async fetchWeather(data: CreateWeatherDto): Promise<IWeatherResponse> {
    const url = this.buildUrl(data);
    return await this.fetch.fetchData<IWeatherResponse>(url);
  }

  async unique(dto: CreateWeatherDto): Promise<{ message: string }> {
    const weatherData = await this.fetchWeather(dto);
    const existing = await this.findOneByCoordinates(dto);

    if (existing) {
      await this.update(existing.weather_id, JSON.stringify(weatherData));
    } else {
      await this.create(dto, weatherData);
    }

    return { message: 'Weather data created successfully' };
  }

  async getWeather(dto: CreateWeatherDto): Promise<WeatherData> {
    const weather = await this.findOneByCoordinates(dto);
    if (!weather) throw new NotFoundException('Weather data not found');
    return weather;
  }

  async create(
    dto: CreateWeatherDto,
    weather: IWeatherResponse,
  ): Promise<WeatherData> {
    return await this.prisma.weatherData.create({
      data: {
        lat: dto.lat,
        lon: dto.lon,
        exclude: dto.part,
        data: JSON.stringify(weather),
      },
    });
  }

  async findOneByCoordinates(
    dto: CreateWeatherDto,
  ): Promise<WeatherData | null> {
    return await this.prisma.weatherData.findFirst({
      where: {
        lat: dto.lat,
        lon: dto.lon,
        exclude: dto.part,
      },
    });
  }

  async update(id: number, dto: string): Promise<WeatherData> {
    return await this.prisma.weatherData.update({
      where: { weather_id: id },
      data: dto,
    });
  }
}
