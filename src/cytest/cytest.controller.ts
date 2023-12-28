// cytest.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { CytestService } from './cytest.service';
import { Cytest } from './entities/cytest.entity';
import { Response } from 'express';

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

  @Get('/run/:id')
  async runCode(@Param('id') id: number, @Res() response: Response) {
    try {
      await this.cytestService.processCodeBlock(id);
      response.status(200).send('代码执行成功');
    } catch (error) {
      response.status(500).send(`代码执行错误: ${error.message}`);
    }
  }
}
