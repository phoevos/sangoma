import { ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto

        const user = new User()
        user.username = username

        const salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, salt)

        try {
            await user.save()            
        } catch (error) {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username is already in use.')
            } else {
                throw new InternalServerErrorException()
            }
        }
        return username // added
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto

        const user = await this.findOne({username})
        if (!user) {
            throw new BadRequestException('Invalid username or password.')
        }
        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            throw new BadRequestException('Invalid username or password.')
        }
        return username
    }
}