import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { CreateProfileDto } from './dto/create-profile.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class ProfilesService {
  private readonly profiles = [
    {
      id: randomUUID(),
      name: 'Brianna Watts',
      description: 'Backend developer who enjoys hiking and photography.',
    },
    {
      id: randomUUID(),
      name: 'Jasper Quinn',
      description: 'Graphic designer based in Toronto. Loves cooking and jazz.',
    },
    {
      id: randomUUID(),
      name: 'Leo Park',
      description: 'Math teacher and weekend cyclist. Reads a lot of sci-fi.',
    },
  ];
  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    const profile = this.profiles.find((profile) => profile.id === id);
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }
    return profile;
  }
  createProfile(createProfileDto: CreateProfileDto) {
    const createdProfile = {
      id: randomUUID(),
      ...createProfileDto,
    };
    this.profiles.push(createdProfile);
    return createdProfile;
  }

  updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    if (!updateProfileDto.name && !updateProfileDto.description) {
      throw new BadRequestException('Send a name or description to update');
    }
    const profile = this.findOne(id);
    if (updateProfileDto.name) {
      profile.name = updateProfileDto.name;
    }
    if (updateProfileDto.description) {
      profile.description = updateProfileDto.description;
    }
    return profile;
  }

  removeProfile(id: string) {
    const profile = this.findOne(id);
    const index = this.profiles.indexOf(profile);
    this.profiles.splice(index, 1);
  }
}
