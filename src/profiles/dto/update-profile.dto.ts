import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto.js';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;
}
