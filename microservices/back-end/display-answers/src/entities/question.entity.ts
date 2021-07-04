import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";

@Entity()
export class Question extends BaseEntity {
    @PrimaryColumn()
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
