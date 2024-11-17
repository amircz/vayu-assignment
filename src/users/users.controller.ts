import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {UsersService} from './users.service';
import {configObject} from "../config";

const {usersConfig} = configObject;

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    async getUsersPaginated(
        @Query('pageSize') pageSize: string = usersConfig.defaultPageSize, // Default page size to 10
    ) {
        return await this.usersService.findAllWithPagination(+pageSize);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.usersService.remove(+id);
    }
}
