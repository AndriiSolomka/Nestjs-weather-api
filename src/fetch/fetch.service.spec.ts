import { Test, TestingModule } from '@nestjs/testing';
import { FetchService } from './fetch.service';
import { HttpException, HttpStatus } from '@nestjs/common';

global.fetch = jest.fn();

describe('FetchService', () => {
  let service: FetchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchService],
    }).compile();

    service = module.get<FetchService>(FetchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully fetch data', async () => {
    const mockResponse = { data: 'some data' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => mockResponse,
    });

    const url = 'https://example.com/data';
    const result = await service.fetchData(url);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('should throw HttpException when fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Bad Request',
    });

    const url = 'https://example.com/data';

    await expect(service.fetchData(url)).rejects.toThrowError(
      new HttpException(
        `Failed to fetch data from ${url}: Bad Request`,
        HttpStatus.BAD_GATEWAY,
      ),
    );
  });
});
