import * as process from "node:process";


export const configObject = {
    serverConfig: {port: +process.env.SERVER_PORT},
    usersConfig: {defaultPageSize: process.env.USERS_DEFAULT_PAGE_SIZE},
    groupsConfig: {defaultPageSize: process.env.GROUPS_DEFAULT_PAGE_SIZE}
}