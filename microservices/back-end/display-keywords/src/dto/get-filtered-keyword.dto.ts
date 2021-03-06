import {IsOptional, IsString } from "class-validator"

export class FilteredKeywordDto {
    @IsOptional()
    @IsString()
    keywordPart: string

    @IsOptional()
    @IsString()
    username: string
}