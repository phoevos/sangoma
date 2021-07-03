import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    private jwtService: JwtService
    ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
      const { username, password } = authCredentialsDto

      const user = new User()
      user.username = username

      const salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(password, salt)

      try {
          await user.save()            
      } catch (error) {
          if (error.code === '23505') { // duplicate username
              throw new ConflictException('Username is already in use.')
          } else {
              throw new InternalServerErrorException(error.message)
          }
      }

      if (username) {
          const payload: JwtPayload = { username }
          const accessToken = this.jwtService.sign(payload)

          return { accessToken }
      }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
      const { username, password } = authCredentialsDto

      const user = await this.entityManager.findOne(User, {username})
      if (!user) {
          throw new BadRequestException('Invalid username or password.')
      }
      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
          throw new BadRequestException('Invalid username or password.')
      }

      if (username) {
          const payload: JwtPayload = { username }
          const accessToken = this.jwtService.sign(payload)

          return { accessToken }
      }
  }
}
