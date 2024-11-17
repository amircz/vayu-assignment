import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {GroupsService} from './groups.service';
import {configObject} from "../config";

const {groupsConfig} = configObject;

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {
    }

    @Get()
    async getGroupsPaginated(@Query('pageSize') pageSize: string = groupsConfig.defaultPageSize) {
        return await this.groupsService.findAllWithPagination(+pageSize);
    }
}
