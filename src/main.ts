import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  // app.use(cookieParser());
  // app.use(passport.initialize());
  // app.use(passport.session());

  app.setGlobalPrefix('/api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Listening on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
