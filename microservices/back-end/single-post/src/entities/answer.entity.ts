import { Question } from "./question.entity"
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Answer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @Column()
    username: string

    @Column()
    dateTime: Date

    @ManyToOne(type => Question, question => question.answers, { onDelete: "CASCADE"})
    question: Question

    @Column()
    questionId: number
}
