import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FetchService {
  async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new HttpException(
        `Failed to fetch data from ${url}: ${response.statusText}`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return (await response.json()) as T;
  }
}
