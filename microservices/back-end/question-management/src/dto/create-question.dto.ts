import { Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsString } from "class-validator"
import { Keyword } from "src/entities/keyword.entity"

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    title: string

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

    keywords: Keyword[]

}
