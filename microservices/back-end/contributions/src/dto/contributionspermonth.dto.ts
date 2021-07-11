import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ContributionsPerMonthDto {
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    year: number

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    month: number

    @IsString()
    @IsNotEmpty()
    username: string
}