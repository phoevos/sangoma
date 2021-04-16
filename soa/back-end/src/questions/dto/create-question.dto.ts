import { IsDate, IsNotEmpty, IsString } from "class-validator"

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

    @IsDate()
    @IsNotEmpty()
    dateTime: Date
}
