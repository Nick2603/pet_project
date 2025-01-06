import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { AxiosError, GenericAbortSignal } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AppHttpService {
  constructor(private readonly httpService: HttpService) {}

  async fetchGet<T>(
    url: string,
    queryName: string,
    signal?: GenericAbortSignal,
  ): Promise<T[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<T[]>(url, { signal }).pipe(
        catchError((error: AxiosError) => {
          console.error(
            error.response?.data ||
              `Error happened while fetching ${queryName}`,
          );
          throw new Error(`Error happened while fetching ${queryName}`);
        }),
      ),
    );

    return data;
  }
}
