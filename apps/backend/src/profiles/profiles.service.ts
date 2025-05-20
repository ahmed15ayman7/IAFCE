import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from 'dtos/Profile.create.dto';
import { UpdateProfileDto } from 'dtos/Profile.update.dto';
import { Profile } from '@shared/prisma';


@Injectable()
export class ProfilesService {
    constructor(private prisma: PrismaService) { }

    async create(createProfileDto: CreateProfileDto): Promise<Profile> {
        return this.prisma.profile.create({ data: createProfileDto });
    }

    async findAll(): Promise<Profile[]> {
        return this.prisma.profile.findMany();
    }

    async findOne(id: string): Promise<Profile> {
        return this.prisma.profile.findUnique({ where: { id } });
    }

    async update(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
        return this.prisma.profile.update({ where: { id }, data: updateProfileDto });
    }

    async remove(id: string): Promise<Profile> {
        return this.prisma.profile.delete({ where: { id } });
    }
}
