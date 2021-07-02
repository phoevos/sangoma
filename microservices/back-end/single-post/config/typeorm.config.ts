import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';
import { User } from "src/auth/user.entity";
import { Answer } from "src/entities/answer.entity";
import { Keyword } from "src/entities/keyword.entity";
import { Question } from "src/entities/question.entity";

const dbConfig = config.get('db')
export const usersOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.usersDatabase,
    entities: [User],
    autoLoadEntities: true,
    synchronize: dbConfig.synchronize
}

export const questionsOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    name: 'questions',
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.questionsDatabase,
    entities: [Question, Answer, Keyword],
    autoLoadEntities: true,
    synchronize: dbConfig.synchronize
}