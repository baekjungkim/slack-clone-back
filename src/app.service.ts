import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppService {
  constructor(
    @InjectPinoLogger(AppService.name)
    private readonly logger: PinoLogger,
    private configService: ConfigService,
  ) {}

  getHello(): string {
    this.logger.fatal('asdf');
    return this.configService.get('PORT');
  }
}
