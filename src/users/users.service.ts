import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { user } from './types';
import { AppConfigService } from 'src/config/app-config.service';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async fetchUsers(): Promise<user[]> {
    const url = new URL(this.appConfigService.usersUrl);

    const { data } = await firstValueFrom(
      this.httpService.get<user[]>(url.toString()).pipe(
        catchError((error: AxiosError) => {
          console.error(error.response?.data);
          throw new Error('Error happened while fetching users');
        }),
      ),
    );

    return data;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async processUsers() {
    const result = await this.fetchUsers();
    console.log(result);
  }
}
