import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { CreateWorkspaceDto } from 'src/workspaces/dto/create-workspace.dto';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@ApiTags('WORKSPACES')
@UseGuards(LoggedInGuard)
@Controller('workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  // @Get(':keys')
  // getMyWorkspaces(
  //   @Param('keys', new ParseArrayPipe({ items: Number, separator: ',' })) keys: number[],
  // ) {
  //   console.log(keys);
  //   // return this.workspacesService.findMyWorkspaces(myId);
  // }

  @Get()
  async getMyWorksapces(@User() user: Users) {
    return this.workspacesService.findMyWorkspaces(user.id);
  }

  @Post()
  createWorkspace(@User() user: Users, @Body() body: CreateWorkspaceDto) {
    return this.workspacesService.createWorkspcae(body.workspace, body.url, user.id);
  }

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMembersToWorkspace() {}

  @Delete(':url/members/:id')
  kickMemberFromWorkspace() {}

  @Get(':url/members/:id')
  getMemberInfoInWorkspace() {}
}
