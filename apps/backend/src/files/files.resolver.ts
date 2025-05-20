import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { CreateFileDto } from 'dtos/File.create.dto';
import { UpdateFileDto } from 'dtos/File.update.dto';
import { FileEntity } from 'dtos/File.entity';

@Resolver(() => FileEntity)
export class FilesResolver {
    constructor(private readonly filesService: FilesService) { }

    @Mutation(() => FileEntity)
    create(@Args('createFileInput') createFileInput: CreateFileDto) {
        return this.filesService.create(createFileInput);
    }

    @Query(() => [FileEntity])
    findAll() {
        return this.filesService.findAll();
    }

    @Query(() => FileEntity)
    findOne(@Args('id') id: string) {
        return this.filesService.findOne(id);
    }

    @Mutation(() => FileEntity)
    update(@Args('id') id: string, @Args('updateFileInput') updateFileInput: UpdateFileDto) {
        return this.filesService.update(id, updateFileInput);
    }

    @Mutation(() => FileEntity)
    remove(@Args('id') id: string) {
        return this.filesService.remove(id);
    }
} 