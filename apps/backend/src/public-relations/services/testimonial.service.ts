import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTestimonialDto } from '../../../dtos/Testimonial.create.dto';
import { UpdateTestimonialDto } from '../../../dtos/Testimonial.update.dto';

@Injectable()
export class TestimonialService {
    constructor(private prisma: PrismaService) { }

    async create(createTestimonialDto: CreateTestimonialDto) {
        return this.prisma.testimonial.create({
            data: createTestimonialDto,
        });
    }

    async findAll() {
        return this.prisma.testimonial.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                course: true,
                academy: true,
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.testimonial.findUnique({
            where: { id },
            include: {
                course: true,
                academy: true,
            },
        });
    }

    async update(id: string, updateTestimonialDto: UpdateTestimonialDto) {
        return this.prisma.testimonial.update({
            where: { id },
            data: updateTestimonialDto,
            include: {
                course: true,
                academy: true,
            },
        });
    }

    async remove(id: string) {
        return this.prisma.testimonial.delete({
            where: { id },
        });
    }

    async findByCourse(courseId: string) {
        return this.prisma.testimonial.findMany({
            where: { courseId },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                course: true,
                academy: true,
            },
        });
    }

    async findByAcademy(academyId: string) {
        return this.prisma.testimonial.findMany({
            where: { academyId },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                course: true,
                academy: true,
            },
        });
    }
}