import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificateDto } from 'dtos/Certificate.create.dto';
import { UpdateCertificateDto } from 'dtos/Certificate.update.dto';
import { Academy, Certificate } from '@shared/prisma';
@Injectable()
export class CertificateService {
    constructor(private prisma: PrismaService) { }

    async create(createCertificateInput: CreateCertificateDto): Promise<Certificate> {
        return this.prisma.certificate.create({
            data: createCertificateInput,
            include: {
                user: true,
            },
        });
    }

    async findAll(): Promise<Certificate[]> {
        return this.prisma.certificate.findMany({
            include: {
                user: true,
            },
        });
    }

    async findByStudent(userId: string): Promise<Certificate[]> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${user.id} not found`);
        }

        return this.prisma.certificate.findMany({
            where: {
                userId: user.id,
            },
        });
    }

    async findOne(id: string): Promise<Certificate> {
        const certificate = await this.prisma.certificate.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });

        if (!certificate) {
            throw new NotFoundException(`Certificate with ID ${id} not found`);
        }

        return certificate;
    }

    async update(id: string, updateCertificateInput: UpdateCertificateDto): Promise<Certificate> {
        const certificate = await this.findOne(id);
        if (!certificate) {
            throw new NotFoundException(`Certificate with ID ${id} not found`);
        }

        return this.prisma.certificate.update({
            where: { id },
            data: updateCertificateInput,
            include: {
                user: true,
            },
        });
    }

    async remove(id: string): Promise<Certificate> {
        const certificate = await this.findOne(id);
        if (!certificate) {
            throw new NotFoundException(`Certificate with ID ${id} not found`);
        }

        return this.prisma.certificate.delete({
            where: { id },
            include: {
                user: true,
            },
        });
    }

}