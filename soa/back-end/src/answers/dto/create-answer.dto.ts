import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateAnswerDto {
    @IsNotEmpty()
    questionId: number

    @IsString()
    @IsNotEmpty()
    text: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsDate()
    @IsNotEmpty()
    dateTime: Date
}
