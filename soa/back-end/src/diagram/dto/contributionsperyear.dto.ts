import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ContributionsPerYearDto {
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    year: number

    @IsString()
    @IsNotEmpty()
    username: string
}