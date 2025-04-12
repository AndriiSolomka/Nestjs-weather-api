import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { PrismaService } from '../prisma/prisma.service';
import { FetchService } from '../fetch/fetch.service';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  weatherData: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const mockFetchService = {
  fetchData: jest.fn(),
};

const mockConfigService = {
  get: jest.fn().mockReturnValue('ENV_VALUE'),
};

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: FetchService, useValue: mockFetchService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buildUrl', () => {
    it('should build the correct URL', () => {
      const data = { lat: 40.7128, lon: -74.006, part: 'current' };
      const baseUrl = 'ENV_VALUE';
      const apiKey = 'ENV_VALUE';
      const expectedUrl = `${baseUrl}lat=40.7128&lon=-74.006&exclude=current&appid=${apiKey}`;

      const result = service.buildUrl(data);
      expect(result).toBe(expectedUrl);
    });
  });

  describe('unique', () => {
    it('should create weather data when it does not exist', async () => {
      const dto = { lat: 40.7128, lon: -74.006, part: 'current' };
      const mockWeatherData = { temp: 15, humidity: 80 };
      mockFetchService.fetchData.mockResolvedValue(mockWeatherData);
      mockPrismaService.weatherData.findFirst.mockResolvedValue(null);
      mockPrismaService.weatherData.create.mockResolvedValue({
        lat: dto.lat,
        lon: dto.lon,
        exclude: dto.part,
        data: JSON.stringify(mockWeatherData),
      });

      const result = await service.unique(dto);

      expect(mockPrismaService.weatherData.findFirst).toHaveBeenCalledWith({
        where: { lat: dto.lat, lon: dto.lon, exclude: dto.part },
      });
      expect(mockPrismaService.weatherData.create).toHaveBeenCalledWith({
        data: {
          lat: dto.lat,
          lon: dto.lon,
          exclude: dto.part,
          data: JSON.stringify(mockWeatherData),
        },
      });
      expect(result.message).toBe('Weather data created successfully');
    });

    it('should update weather data when it already exists', async () => {
      const dto = { lat: 40.7128, lon: -74.006, part: 'current' };
      const mockWeatherData = { temp: 15, humidity: 80 };
      const existingWeather = {
        weather_id: 1,
        lat: dto.lat,
        lon: dto.lon,
        exclude: dto.part,
        data: '{}',
      };
      mockFetchService.fetchData.mockResolvedValue(mockWeatherData);
      mockPrismaService.weatherData.findFirst.mockResolvedValue(
        existingWeather,
      );
      mockPrismaService.weatherData.update.mockResolvedValue({
        ...existingWeather,
        data: JSON.stringify(mockWeatherData),
      });

      const result = await service.unique(dto);

      expect(mockPrismaService.weatherData.findFirst).toHaveBeenCalledWith({
        where: { lat: dto.lat, lon: dto.lon, exclude: dto.part },
      });
      expect(mockPrismaService.weatherData.update).toHaveBeenCalledWith({
        where: { weather_id: existingWeather.weather_id },
        data: { data: JSON.stringify(mockWeatherData) },
      });
      expect(result.message).toBe('Weather data created successfully');
    });
  });

  describe('getWeather', () => {
    it('should throw NotFoundException if no weather data is found', async () => {
      const dto = { lat: 40.7128, lon: -74.006, part: 'current' };
      mockPrismaService.weatherData.findFirst.mockResolvedValue(null);

      try {
        await service.getWeather(dto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(error.message).toBe('Weather data not found');
      }
    });

    it('should return weather data if found', async () => {
      const dto = { lat: 40.7128, lon: -74.006, part: 'current' };
      const weatherData = {
        weather_id: 1,
        lat: dto.lat,
        lon: dto.lon,
        exclude: dto.part,
        data: '{"temp": 15, "humidity": 80}',
      };
      mockPrismaService.weatherData.findFirst.mockResolvedValue(weatherData);

      const result = await service.getWeather(dto);

      expect(result).toEqual(weatherData);
    });
  });

  describe('create', () => {
    it('should create and return weather data', async () => {
      const dto = { lat: 40.7128, lon: -74.006, part: 'current' };
      const mockWeatherData = {
        lat: 40.7128,
        lon: -74.006,
        timezone: 'America/New_York',
        timezone_offset: -14400,
      };
      mockPrismaService.weatherData.create.mockResolvedValue({
        lat: dto.lat,
        lon: dto.lon,
        exclude: dto.part,
        data: JSON.stringify(mockWeatherData),
      });

      const result = await service.create(dto, mockWeatherData);

      expect(result).toEqual({
        lat: dto.lat,
        lon: dto.lon,
        exclude: dto.part,
        data: JSON.stringify(mockWeatherData),
      });
    });
  });

  describe('update', () => {
    it('should update and return the updated weather data', async () => {
      const id = 1;
      const updateDto = { data: '{"temp": 20, "humidity": 60}' };
      const updatedWeather = {
        weather_id: id,
        lat: 40.7128,
        lon: -74.006,
        exclude: 'current',
        data: updateDto.data,
      };
      mockPrismaService.weatherData.update.mockResolvedValue(updatedWeather);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(updatedWeather);
    });
  });
});
