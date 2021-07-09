import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';
import { Keyword } from "src/entities/keyword.entity";
import { Question } from "src/entities/question.entity";

const dbConfig = config.get('db')

export const questionsOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    ssl: process.env.PROD || false,
    extra: {
        ssl: process.env.PROD ? {rejectUnauthorized: false} : null
    },
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    name: 'questions',
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.questionsDatabase,
    entities: [Question, Keyword],
    autoLoadEntities: true,
    synchronize: dbConfig.synchronize
}