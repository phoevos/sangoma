import { Answer } from "src/answers/entities/answer.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: true })
    text: string

    @Column({ nullable: true })
    username: string

    @Column()
    dateTime: Date

    @OneToMany(type => Answer, answer => answer.question, { onDelete: "CASCADE"})
    answers: Answer[]
}
