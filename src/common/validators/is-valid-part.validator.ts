import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { WeatherTimeframe } from 'src/constants/enums/weather';

@ValidatorConstraint({ async: false })
export class IsValidPart implements ValidatorConstraintInterface {
  validate(value: string) {
    const parts = value.split(',');

    return parts.every((part) =>
      Object.values(WeatherTimeframe).includes(part as WeatherTimeframe),
    );
  }

  defaultMessage() {
    return `part must be one of the following values: ${Object.values(WeatherTimeframe).join(', ')}`;
  }
}
