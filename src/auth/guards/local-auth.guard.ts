import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private logger: PinoLogger) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);
    if (can) {
      const request = context.switchToHttp().getRequest();
      this.logger.info('login for cookie');
      await super.logIn(request);
    }
    return true;
  }
}
