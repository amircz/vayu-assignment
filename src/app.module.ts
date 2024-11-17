import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {UsersController} from "./users/users.controller";
import {UsersService} from "./users/users.service";
import {PrismaService} from "./prisma/prisma.service";
import {GroupsModule} from './groups/groups.module';
import {GroupsService} from "./groups/groups.service";

@Module({
    imports: [UsersModule, GroupsModule],
    controllers: [AppController, UsersController],
    providers: [AppService, UsersService, PrismaService, GroupsService],
})
export class AppModule {
}
