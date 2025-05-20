import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AcademiesModule } from './academies/academies.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AchievementsModule } from './achievements/achievements.module';
import { NotificationsModule } from './notifications/notifications.module';
import { WebsocketModule } from './websocket/websocket.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { SubmissionsModule } from './submissions/submissions.module';
import { ReportsModule } from './reports/reports.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PaymentsModule } from './payments/payments.module';
import { EventsModule } from './events/events.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { ChannelsModule } from './channels/courses.module';
import { MessagesModule } from './messages/messages.module';
import { PostsModule } from './posts/posts.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { FilesModule } from './files/files.module';
import { GroupsModule } from './groups/groups.module';
import { ProfilesModule } from './profiles/profiles.module';
import { QuestionsModule } from './questions/questions.module';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // GraphQLModule.forRoot<ApolloDriverConfig>({
        //     driver: ApolloDriver,
        //     autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        //     sortSchema: true,
        //     playground: true,
        // }),
        ThrottlerModule.forRoot([{
            ttl: 60,
            limit: 10,
        }]),
        AuthModule,
        UsersModule,
        AcademiesModule,
        CoursesModule,
        LessonsModule,
        QuizzesModule,
        AchievementsModule,
        NotificationsModule,
        WebsocketModule,
        SubmissionsModule,
        ReportsModule,
        AttendanceModule,
        PaymentsModule,
        EventsModule,
        BookmarksModule,
        ChannelsModule,
        MessagesModule,
        PostsModule,
        EnrollmentsModule,
        FilesModule,
        GroupsModule,
        ProfilesModule,
        QuestionsModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule { } 