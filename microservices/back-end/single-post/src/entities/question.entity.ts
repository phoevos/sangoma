import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";
import { Keyword } from './keyword.entity';

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

    @ManyToMany(() => Keyword, keyword => keyword.questions, { cascade: true })
    @JoinTable({
        name: 'question_keyword',
        joinColumn: { name: 'questionId', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'keywordId', referencedColumnName: 'keyword'},
    })
    keywords: Keyword[]
}
