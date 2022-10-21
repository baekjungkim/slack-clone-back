import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    private logger: PinoLogger,
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMemebersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  async findById(id: number) {
    return this.workspacesRepository.findOne({ where: { id } });
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ UserId: myId }],
      },
    });
  }

  async createWorkspcae(name: string, url: string, myId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const exists = await queryRunner.manager
      .getRepository(Workspaces)
      .findOne({ where: { url } });
    if (exists) {
      throw new ForbiddenException('이미 존재하는 워크스페이스입니다');
    }
    try {
      const newWorkspace = await queryRunner.manager
        .getRepository(Workspaces)
        .save({ name, url, OwnerId: myId });
      const [newChannel] = await Promise.all([
        queryRunner.manager.getRepository(Channels).save({
          name: '일반',
          WorkspaceId: newWorkspace.id,
        }),
        queryRunner.manager
          .getRepository(WorkspaceMembers)
          .save({ UserId: myId, WorkspaceId: newWorkspace.id }),
      ]);
      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: myId,
        ChannelId: newChannel.id,
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findWorkspaceAllMemebers(url: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.WorkspaceMembers', 'members')
      .innerJoin('members.Workspace', 'workspace', 'workspace.url = :url', { url })
      .getMany();
  }
}
