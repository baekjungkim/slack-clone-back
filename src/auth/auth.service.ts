import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private logger: PinoLogger,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, password: string) {
    this.logger.info('AuthService');
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}
