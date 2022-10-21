import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private logger: PinoLogger;

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
