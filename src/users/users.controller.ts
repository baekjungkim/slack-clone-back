import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: '로그인 유저 정보 조회' })
  @ApiOkResponse({ type: UserDto })
  @Get()
  getMyInfo(@Req() req) {
    return req.user;
  }

  @ApiCreatedResponse({ type: UserDto })
  @ApiOperation({ summary: '신규 유저 생성' })
  @Post()
  createUser(@Body() data: JoinRequestDto) {
    return this.usersService.postUsers(data);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ type: UserDto })
  @Post('login')
  loginUser(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logoutUser(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
