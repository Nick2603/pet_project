import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createCatDto: CreateUserDto): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = createCatDto;

    const createdUser = new this.userModel({ ...rest });

    return createdUser.save();
  }

  async updateUserAvatar(username: string, avatar: string): Promise<User> {
    const user = await this.userModel.findOne({ username });

    if (!user) throw new Error(`user ${username} not found`);

    user.avatar = avatar;

    return user.save();
  }
}
