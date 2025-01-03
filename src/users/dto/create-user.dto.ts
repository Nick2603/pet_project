import { OmitType } from '@nestjs/mapped-types';
import { User } from '../schemas/user.schema';

export class CreateUserDto extends OmitType(User, [
  'createdAt',
  'updatedAt',
] as const) {}
