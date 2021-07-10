import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db')
export const usersOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    ssl: (process.env.PROD == 'true') || false,
    extra: {
        ssl: (process.env.PROD == 'true') ? {rejectUnauthorized: false} : null
    },
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.usersDatabase,
    autoLoadEntities: true,
    synchronize: dbConfig.synchronize
}

export const questionsOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    ssl: (process.env.PROD == 'true') || false,
    extra: {
        ssl: (process.env.PROD == 'true') ? {rejectUnauthorized: false} : null
    },
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    name: 'questions',
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.questionsDatabase,
    autoLoadEntities: true,
    synchronize: dbConfig.synchronize
}