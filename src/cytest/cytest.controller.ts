import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CytestService } from './cytest.service';
import { CreateCytestDto } from './dto/create-cytest.dto';
import { UpdateCytestDto } from './dto/update-cytest.dto';

@Controller('cytest')
export class CytestController {
  constructor(private readonly cytestService: CytestService) {}

  @Post()
  create(@Body() createCytestDto: CreateCytestDto) {
    return this.cytestService.create(createCytestDto);
  }

  @Get()
  findAll() {
    return this.cytestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cytestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCytestDto: UpdateCytestDto) {
    return this.cytestService.update(+id, updateCytestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cytestService.remove(+id);
  }
}
