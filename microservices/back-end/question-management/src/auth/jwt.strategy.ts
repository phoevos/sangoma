<<<<<<< HEAD
import { Injectable, UnauthorizedException } from '@nestjs/common';
=======
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
<<<<<<< HEAD
import { Repository } from 'typeorm';
import { User } from './user.entity';
=======
import { UserRepository } from './user.repository';
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
<<<<<<< HEAD
        @InjectRepository(User)
        private userRepository: Repository<User>
=======
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
        })
    }

    async validate(payload: JwtPayload) {
        const { username } = payload
        const user = await this.userRepository.findOne({ username })

        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}