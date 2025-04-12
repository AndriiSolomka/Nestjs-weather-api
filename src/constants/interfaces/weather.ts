interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ITemperature {
  day: number;
  min: number;
  max: number;
  night?: number;
  eve?: number;
  morn?: number;
}

interface IMinutelyWeather {
  dt: number;
  precipitation: number;
}

interface ICurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeather[];
}

interface IDailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: ITemperature;
  feels_like: ITemperature;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeather[];
  clouds: number;
  pop: number;
  uvi: number;
}

interface IHourlyWeather {
  dt: number; // Время (в UNIX-формате)
  temp: number; // Температура
  feels_like: number; // Температура, ощущаемая
  pressure: number; // Давление
  humidity: number; // Влажность
  dew_point: number; // Точка росы
  uvi: number; // Индекс ультрафиолетового излучения
  clouds: number; // Облачность (в %)
  visibility: number; // Видимость
  wind_speed: number; // Скорость ветра
  wind_deg: number; // Направление ветра
  wind_gust: number; // Порывы ветра
  weather: IWeather[]; // Массив погодных условий
  pop: number; // Вероятность осадков
}

interface IAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface IWeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current?: ICurrentWeather;
  minutely?: IMinutelyWeather[];
  hourly?: IHourlyWeather[];
  daily?: IDailyWeather[];
  alerts?: IAlert[];
}
