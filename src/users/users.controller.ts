import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getMyInfo(@Req() req) {
    return req.user;
  }

  @Post()
  createUser(@Body() data: JoinRequestDto) {
    return this.usersService.postUsers(data);
  }

  @Post('login')
  loginUser(@Req() req) {
    return req.user;
  }

  @Post('logout')
  logoutUser(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
