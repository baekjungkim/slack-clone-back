import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// 외부에서 .env 키 조회 가능
// const getEnv = async () => {
//   const response = await axios.get('/비밀키 요청');
//   return response.data
// return { DATABSE_NAME: '' };
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [getEnv]
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
