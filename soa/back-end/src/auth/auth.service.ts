import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) 
        private userRepository: UserRepository,
        private jwtService: JwtService
        ) {}

    // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        // return this.userRepository.signUp(authCredentialsDto)
        const username =  await this.userRepository.signUp(authCredentialsDto)
        if (username) {
            const payload: JwtPayload = { username }
            const accessToken = this.jwtService.sign(payload)

            return { accessToken }
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username =  await this.userRepository.validateUserPassword(authCredentialsDto)

        if (username) {
            const payload: JwtPayload = { username }
            const accessToken = this.jwtService.sign(payload)

            return { accessToken }
        }
    }
}
