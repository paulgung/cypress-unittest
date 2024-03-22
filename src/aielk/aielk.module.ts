import { Module } from '@nestjs/common';
import { AiElkService } from './aielk.service';
import { AiElkController } from './aielk.controller';

@Module({
  controllers: [AiElkController],
  providers: [AiElkService],
})
export class AielkModule {}
