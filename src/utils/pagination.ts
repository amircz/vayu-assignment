import {User} from "../users/entities/user.entity";
import {Group} from "../groups/entities/group.entity";

export const combineToPages = (allData: User[] | Group[], pageSize: number) => {
    const entitiesAmount = allData.length;
    const totalPages = Math.ceil(entitiesAmount / pageSize);
    const pages = Array.from({length: totalPages}, (_, i) => {
        const start = i * pageSize;
        const end = start + pageSize;
        return allData.slice(start, end);
    });

    return {
        total: entitiesAmount,
        "maxPageSize": pageSize,
        totalPages,
        pages,
    };

}