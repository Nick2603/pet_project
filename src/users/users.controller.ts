import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ROUTS } from 'src/constants/routs';

@Controller(ROUTS.USERS.BASE)
@CacheTTL(180_000)
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.queryUsers();
  }
}
