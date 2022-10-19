import { Injectable } from '@nestjs/common';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';

@Injectable()
export class UsersService {
  postUsers({ email, password, nickname }: JoinRequestDto) {
    return true;
  }
}
