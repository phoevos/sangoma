import { Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

export class ContributionsDto {
    @Type(() => Number)
    @IsNumber()
    year: number
    
    @Type(() => Number)
    @IsNumber()
    month: number

    @IsString()
    username: string
}