<<<<<<< HEAD:microservices/back-end/contributions/src/entities/answer.entity.ts
import { Question } from "./question.entity"
=======
import { Question } from "../../questions/entities/question.entity"
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428:soa/back-end/src/qa_service/answers/entities/answer.entity.ts
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
