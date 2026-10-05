import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfilesService } from './profiles.service.js';
import { ProfilesGuard } from './profiles.guard.js';
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.profilesService.findOne(id);
  }

  @Post()
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.createProfile(createProfileDto);
  }

  @Put(':id')
  updateProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ProfilesGuard)
  removeProfile(@Param('id', ParseUUIDPipe) id: string) {
    this.profilesService.removeProfile(id);
  }
}
