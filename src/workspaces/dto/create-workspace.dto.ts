import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Workspaces } from 'src/entities/Workspaces';

export class CreateWorkspaceDto extends PickType(Workspaces, ['url']) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '테스트 워크스페이스',
    description: '워크스페이스 이름',
    required: true,
  })
  workspace: string;
}
