import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {combineToPages} from "../utils/pagination";
import {Group} from "./entities/group.entity";

@Injectable()
export class GroupsService {
    constructor(private readonly prisma: PrismaService) {
    }

    async findAllWithPagination(pageSize: number) {
        const groups: Group[] = await this.prisma.groups.findMany();

        return combineToPages(groups, pageSize);
    }

    async updateGroupStatusToEmpty(groupId: number) {
        const result = await this.prisma.$queryRawUnsafe(
            `
    UPDATE groups
    SET status = 'EMPTY'
    WHERE id = $1
    `,
            groupId,
        );

        return result;
    }
}
