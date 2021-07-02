import { Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Question } from './question.entity';

@Entity()
export class Keyword {
    @PrimaryColumn({ nullable: false, unique: true })
    keyword: string

    @ManyToMany(() => Question, question => question.keywords, { onDelete: "CASCADE"} )
    questions: Question[]
}

