import { IsDate, IsNotEmpty, IsString } from "class-validator"
import { Type } from "class-transformer"

export class CreateAnswerDto {
    @IsNotEmpty()
    questionId: number

    @IsString()
    @IsNotEmpty()
    text: string

    @IsString()
    @IsNotEmpty()
    username: string

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    dateTime: Date
}
