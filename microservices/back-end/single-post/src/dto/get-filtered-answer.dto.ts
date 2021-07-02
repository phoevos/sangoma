import { IsOptional, IsString } from "class-validator"

export class FilteredAnswerDto {
    @IsOptional()
    @IsString()
    username: string
}