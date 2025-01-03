import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { user } from '../types';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
export class Geo {
  @Prop(() => Number)
  @IsNumber()
  lat: number;

  @Prop(() => Number)
  @IsNumber()
  lng: number;
}

@Schema({ _id: false })
export class Address {
  @Prop(() => String)
  @IsString()
  street: string;

  @Prop(() => String)
  @IsString()
  suite: string;

  @Prop(() => String)
  @IsString()
  city: string;

  @Prop(() => Number)
  @IsNumber()
  zipcode: number;

  @Prop({ type: Geo })
  @ValidateNested()
  @Type(() => Geo)
  geo: Geo;
}

@Schema({ _id: false })
export class Company {
  @Prop(() => String)
  @IsString()
  name: string;

  @Prop(() => String)
  @IsString()
  catchPhrase: string;

  @Prop(() => String)
  @IsString()
  bs: string;
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class User implements user {
  @Prop(() => Number)
  id: number;

  @Prop(() => String)
  @IsString()
  name: string;

  @Prop(() => String)
  @IsString()
  username: string;

  @Prop(() => String)
  @IsString()
  email: string;

  @Prop({ type: Address })
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @Prop(() => Number)
  @IsNumber()
  phone: number;

  @Prop(() => String)
  @IsString()
  website: string;

  @Prop({ type: Company })
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop(() => Date)
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
