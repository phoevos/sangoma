import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';
<<<<<<< HEAD
import { User } from "src/auth/user.entity";
import { Answer } from "src/entities/answer.entity";
import { Keyword } from "src/entities/keyword.entity";
import { Question } from "src/entities/question.entity";
=======
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428

const dbConfig = config.get('db')
export const usersOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.usersDatabase,
<<<<<<< HEAD
    entities: [User],
=======
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428
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
<<<<<<< HEAD
    entities: [Question, Answer, Keyword],
=======
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428
    autoLoadEntities: true,
    synchronize: dbConfig.synchronize
}