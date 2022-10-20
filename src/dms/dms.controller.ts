import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DmsService } from 'src/dms/dms.service';

@ApiTags('DM')
@Controller('workspaces/:url/dms')
export class DmsController {
  constructor(private dmsService: DmsService) {}

  @Get(':id/chats')
  // @ApiParam({ name: 'url', type: String, description: '워크스페이스 url' })
  @ApiParam({ name: 'id', type: String, description: '사용자 ID' })
  @ApiQuery({ name: 'perPage', required: true, description: '한번에 가져오는 개수' })
  @ApiQuery({ name: 'page', required: true, description: '불러올 페이지' })
  getAllChatFromDM(@Param() param, @Query() query) {
    console.log(param.id, param.url);
    console.log(query.perPage, query.page);
  }

  @Post(':id/chats')
  createChatToDM(@Body() body) {}
}
