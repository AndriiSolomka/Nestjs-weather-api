import {
  WeatherAttributes,
  WeatherTimeframe,
} from 'src/constants/enums/weather';

export const buildEntry = (element: Record<string, any>) =>
  Object.fromEntries(
    Object.keys(WeatherAttributes).map((weatherKey) => {
      const attributeKey = weatherKey as keyof typeof WeatherAttributes;
      return [
        WeatherAttributes[attributeKey],
        element[WeatherAttributes[attributeKey]] ?? null,
      ];
    }),
  );

export const processTimeframeData = (currentData: Record<string, any>) => {
  return Object.keys(WeatherTimeframe).reduce(
    (acc, key) => {
      const timeKey = WeatherTimeframe[key as keyof typeof WeatherTimeframe];
      const dataPart = currentData[timeKey] as unknown;

      if (!dataPart) return acc;

      acc[timeKey] = Array.isArray(dataPart)
        ? dataPart.map(buildEntry)
        : buildEntry(dataPart);

      return acc;
    },
    {} as Record<string, any>,
  );
};
