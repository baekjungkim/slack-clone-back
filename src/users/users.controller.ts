import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/guards/not-logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  @ApiOperation({ summary: '로그인 유저 정보 조회' })
  @ApiOkResponse({ type: UserDto })
  getMyInfo(@User() user: UserDto) {
    return user || false;
  }

  @UseGuards(NotLoggedInGuard)
  @ApiCreatedResponse({ type: UserDto })
  @ApiOperation({ summary: '신규 유저 생성' })
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    await this.usersService.createUser(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ type: UserDto })
  loginUser(@User() user: UserDto) {
    return user;
  }

  @UseGuards(LoggedInGuard)
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logoutUser(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
