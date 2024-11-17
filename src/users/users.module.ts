import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {PrismaService} from "../prisma/prisma.service";
import {GroupsService} from "../groups/groups.service";

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService, GroupsService],
})
export class UsersModule {
}
