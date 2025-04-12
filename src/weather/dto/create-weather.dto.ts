import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { WeatherTimeframe } from 'src/constants/enums/weather';

export class CreateWeatherDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @IsEnum(WeatherTimeframe)
  @IsNotEmpty()
  part: string;
}
