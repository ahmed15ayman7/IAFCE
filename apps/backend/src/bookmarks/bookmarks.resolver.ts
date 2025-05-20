import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from 'dtos/Bookmark.create.dto';
import { UpdateBookmarkDto } from 'dtos/Bookmark.update.dto';
import { BookmarkEntity } from 'dtos/Bookmark.entity';

@Resolver(() => BookmarkEntity)
export class BookmarksResolver {
    constructor(private readonly bookmarksService: BookmarksService) { }

    @Mutation(() => BookmarkEntity)
    create(@Args('createBookmarkInput') createBookmarkInput: CreateBookmarkDto) {
        return this.bookmarksService.create(createBookmarkInput);
    }

    @Query(() => [BookmarkEntity])
    findAll() {
        return this.bookmarksService.findAll();
    }

    @Query(() => BookmarkEntity)
    findOne(@Args('id') id: string) {
        return this.bookmarksService.findOne(id);
    }

    @Mutation(() => BookmarkEntity)
    update(@Args('id') id: string, @Args('updateBookmarkInput') updateBookmarkInput: UpdateBookmarkDto) {
        return this.bookmarksService.update(id, updateBookmarkInput);
    }

    @Mutation(() => BookmarkEntity)
    remove(@Args('id') id: string) {
        return this.bookmarksService.remove(id);
    }
} 