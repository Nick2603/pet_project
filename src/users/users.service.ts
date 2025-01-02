import { CronService } from './../cron/cron.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { user } from './types';
import { AppConfigService } from 'src/config/app-config.service';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CronExpression } from '@nestjs/schedule';

@Injectable()
export class UsersService {
  cronJobName = 'processUsers';

  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
    private readonly cronService: CronService,
  ) {}

  async onModuleInit() {
    await this.processUsers();
  }

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

  async processUsers() {
    const processFunc = async () => {
      const result = await this.fetchUsers();
      console.log(result);
    };

    this.cronService.addCronJob(
      this.cronJobName,
      CronExpression.EVERY_DAY_AT_MIDNIGHT,
      processFunc,
    );
  }
}
