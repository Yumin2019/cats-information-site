import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'test@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'blue',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default: 'https://avatars.githubusercontent.com/u/49779139?v=4',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// 필요한 데이터를 virtual 처리 (password filtering)
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
