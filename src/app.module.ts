import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {UsersController} from "./users/users.controller";
import {UsersService} from "./users/users.service";
import {PrismaService} from "./prisma/prisma.service";
import {GroupsModule} from './groups/groups.module';
import {GroupsService} from "./groups/groups.service";

@Module({
    imports: [UsersModule, GroupsModule],
    controllers: [UsersController],
    providers: [UsersService, PrismaService, GroupsService],
})
export class AppModule {
}
