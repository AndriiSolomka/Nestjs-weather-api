import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { WeatherData } from '@prisma/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IWeatherResponse } from 'src/constants/interfaces/weather';
import { processTimeframeData } from 'src/utils/weather.utils';

@Injectable()
export class SelectCurrentWeatherInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<WeatherData>,
  ): Observable<any> {
    return next.handle().pipe(
      map((element: WeatherData) => {
        const currentData = JSON.parse(
          element.data as string,
        ) as IWeatherResponse;
        return processTimeframeData(currentData);
      }),
    );
  }
}
