import { Type } from "class-transformer"
import { IsDate, IsOptional, IsString } from "class-validator"
import { Keyword } from "src/keywords/entities/keyword.entity"

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
    matchingKeywords: Keyword[]

}