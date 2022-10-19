import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChannelsService } from 'src/channels/channels.service';

@Controller('workspaces/:url/channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get()
  getAllChannels() {}

  @Post()
  createChannel() {}

  @Get(':name')
  getSpecificChannel() {}

  @Get(':id/chats')
  getAllChatFromChannel(@Param() param, @Query() query) {
    console.log(param.id, param.url);
    console.log(query.perPage, query.page);
  }

  @Post(':id/chats')
  createChatToChannel(@Body() body) {}

  @Get(':name/members')
  getAllMemebers() {}

  @Post(':name/members')
  inviteMembers() {}
}
