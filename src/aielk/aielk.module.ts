import { Module } from '@nestjs/common';
import { AielkService } from './aielk.service';
import { AielkController } from './aielk.controller';

@Module({
  controllers: [AielkController],
  providers: [AielkService]
})
export class AielkModule {}
