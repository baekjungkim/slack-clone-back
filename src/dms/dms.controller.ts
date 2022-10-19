import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DmsService } from 'src/dms/dms.service';

@Controller('workspaces/:url/dms')
export class DmsController {
  constructor(private dmsService: DmsService) {}

  @Get(':id/chats')
  getAllChatFromDM(@Param() param, @Query() query) {
    console.log(param.id, param.url);
    console.log(query.perPage, query.page);
  }

  @Post(':id/chats')
  createChatToDM(@Body() body) {}
}
