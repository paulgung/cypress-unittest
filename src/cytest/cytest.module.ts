import { Module } from '@nestjs/common';
import { CytestService } from './cytest.service';
import { CytestController } from './cytest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cytest } from './entities/cytest.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Cytest])],
  controllers: [CytestController],
  providers: [CytestService],
})
export class CytestModule {}
