import { CronService } from './../cron/cron.service';
import { Injectable } from '@nestjs/common';
import { user } from './types';
import { AppConfigService } from 'src/config/app-config.service';
import { CronExpression } from '@nestjs/schedule';
import { AppHttpService } from 'src/http/app-http.service';
import { UsersRepository } from './repositories/users.repository';
import { UsersQueryRepository } from './repositories/users.query-repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { findNew } from 'src/utils/findNew';

@Injectable()
export class UsersService {
  private readonly cronJobName = 'processUsers';
  private readonly queryName = 'query users';
  private readonly abortController = new AbortController();

  constructor(
    private readonly appHttpService: AppHttpService,
    private readonly appConfigService: AppConfigService,
    private readonly cronService: CronService,
    private readonly usersRepository: UsersRepository,
    private readonly usersQueryRepository: UsersQueryRepository,
  ) {}

  private async onModuleInit(): Promise<void> {
    await this.processUsers();
  }

  private async onModuleDestroy(): Promise<void> {
    this.abortController.abort();
  }

  private async fetchUsers(): Promise<user[]> {
    const url = new URL(this.appConfigService.usersUrl);

    return await this.appHttpService.fetchGet<user>(
      url.toString(),
      this.queryName,
      this.abortController.signal,
    );
  }

  private async processUsers(): Promise<void> {
    const processFunc = async () => {
      try {
        const newUsers = await this.fetchUsers();

        const existingUsers = await this.usersQueryRepository.findAll();

        const notIncludedUsers = findNew(newUsers, existingUsers);

        console.log(notIncludedUsers);

        const userPromises = notIncludedUsers.map((user) =>
          this.usersRepository.create(user),
        );

        await Promise.allSettled(userPromises);

        console.log('Users successfully proceeded');
      } catch (e) {
        console.error('Failed to proceed users', e);
      }
    };

    this.cronService.addCronJob(
      this.cronJobName,
      CronExpression.EVERY_DAY_AT_MIDNIGHT,
      processFunc,
    );
  }

  async queryUsers(): Promise<User[]> {
    return this.usersQueryRepository.findAll();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(dto);
  }
}
