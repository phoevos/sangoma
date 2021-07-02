import { Type } from "class-transformer"
import { IsArray, IsDate, IsOptional, IsString } from "class-validator"

export class FilteredQuestionDto {
    @IsOptional()
    @IsString()
    titlePart: string

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate: string

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate: Date  
    
    @IsOptional()
    @IsString()
    username: string
    
    @IsOptional()
    matchingKeywords: string[]

}