import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TestimonialService } from '../services/testimonial.service';
import { CreateTestimonialDto } from '../../../dtos/Testimonial.create.dto';
import { UpdateTestimonialDto } from '../../../dtos/Testimonial.update.dto';

@Controller('public-relations/testimonials')
export class TestimonialController {
    constructor(private readonly testimonialService: TestimonialService) { }

    @Post()
    create(@Body() createTestimonialDto: CreateTestimonialDto) {
        return this.testimonialService.create(createTestimonialDto);
    }

    @Get()
    findAll(
        @Query('courseId') courseId?: string,
        @Query('academyId') academyId?: string,
    ) {
        if (courseId) {
            return this.testimonialService.findByCourse(courseId);
        }
        if (academyId) {
            return this.testimonialService.findByAcademy(academyId);
        }
        return this.testimonialService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testimonialService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTestimonialDto: UpdateTestimonialDto) {
        return this.testimonialService.update(id, updateTestimonialDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testimonialService.remove(id);
    }
}