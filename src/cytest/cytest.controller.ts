// cytest.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CytestService } from './cytest.service';
import { Cytest } from './entities/cytest.entity';

@Controller('cytests')
export class CytestController {
  constructor(private cytestService: CytestService) {}

  @Post()
  create(@Body() cytestData: Partial<Cytest>): Promise<Cytest> {
    return this.cytestService.create(cytestData);
  }

  @Get()
  findAll(): Promise<Cytest[]> {
    return this.cytestService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<Cytest> {
    return this.cytestService.findOne(uuid);
  }

  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() cytestData: Partial<Cytest>,
  ): Promise<Cytest> {
    return this.cytestService.update(uuid, cytestData);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.cytestService.remove(uuid);
  }
}
