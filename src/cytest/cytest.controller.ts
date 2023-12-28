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

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Cytest> {
    return this.cytestService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() cytestData: Partial<Cytest>,
  ): Promise<Cytest> {
    return this.cytestService.update(id, cytestData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.cytestService.remove(id);
  }
}
