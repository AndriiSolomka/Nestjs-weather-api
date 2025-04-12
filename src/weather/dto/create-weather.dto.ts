import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IsValidPart } from 'src/common/validators/is-valid-part.validator';

export class CreateWeatherDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidPart)
  part: string;
}
