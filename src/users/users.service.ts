import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {GroupsService} from "../groups/groups.service";
import {User} from "./entities/user.entity";
import {combineToPages} from "../utils/pagination";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService, private readonly groupService: GroupsService) {
    }

    async findAllWithPagination(pageSize: number) {
        const users: User[] = await this.prisma.users.findMany();

        return combineToPages(users, pageSize);
    }

    async remove(id: number) {
        try {
            return this.prisma.$transaction(async (prisma) => {
                try {
                    const userGroups = await prisma.user_groups.findMany({
                        where: {user_id: id},
                        select: {group_id: true},
                    });
                    const user = await this.prisma.users.findUnique({where: {id}})

                    if (user === null)
                        return {message: `user with id=${id} not found`};

                    await prisma.user_groups.deleteMany({where: {user_id: id}});
                    await prisma.users.delete({where: {id}});

                    for (const {group_id} of userGroups) {
                        const remainingUsers = await prisma.user_groups.count({
                            where: {group_id},
                        });

                        if (remainingUsers === 0) {
                            try {
                                await this.groupService.updateGroupStatusToEmpty(group_id);
                            } catch (error) {
                                console.error(`Failed to update status for group ${group_id}:`, error);
                                throw new Error(`Error updating group status for group ID ${group_id}.`);
                            }
                        }
                    }

                    return {message: 'User removed and group statuses updated successfully.'};
                } catch (error) {
                    console.error('Error during transaction:', error);

                    throw new Error('An error occurred while removing the user and updating group statuses.');
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}
