import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";

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
    
    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[]
}
