import { Module } from '@nestjs/common';
import { AiSourceMapService } from './ai-source-map.service';
import { AiSourceMapController } from './ai-source-map.controller';

@Module({
  controllers: [AiSourceMapController],
  providers: [AiSourceMapService],
})
export class AiSourceMapModule {}
