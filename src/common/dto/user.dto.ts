import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;

  @ApiProperty({ example: 'test@gmail.com', description: '이메일', required: true })
  public email: string;

  @ApiProperty({ example: '테스터', description: '닉네임', required: true })
  public nickname: string;
}
