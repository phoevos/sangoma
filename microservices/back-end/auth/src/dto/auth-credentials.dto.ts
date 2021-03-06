import { IsString, Matches, MaxLength, MinLength } from "class-validator"

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    username: string

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Password should contain at least 1 upper case letter, 1 lower case letter and 1 special character or number.'}
    )
    password: string
}