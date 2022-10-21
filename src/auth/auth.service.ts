import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UsersService } from 'src/users/users.service';
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
    const user = await this.usersRepository.findOne({ where: { email } });
    this.logger.info(user);
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
