import { Module } from '@nestjs/common';
import { CytestService } from './cytest.service';
import { CytestController } from './cytest.controller';

@Module({
  controllers: [CytestController],
  providers: [CytestService]
})
export class CytestModule {}
