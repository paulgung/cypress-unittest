import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AiSourceMapService } from './ai-source-map.service';
import { CreateAiSourceMapDto } from './dto/create-ai-source-map.dto';
import { UpdateAiSourceMapDto } from './dto/update-ai-source-map.dto';

@Controller('ai-source-map')
export class AiSourceMapController {
  constructor(private readonly aiSourceMapService: AiSourceMapService) {}

  @Post()
  create(@Body() createAiSourceMapDto: CreateAiSourceMapDto) {
    return this.aiSourceMapService.create(createAiSourceMapDto);
  }

  @Get()
  findAll() {
    return this.aiSourceMapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiSourceMapService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAiSourceMapDto: UpdateAiSourceMapDto,
  ) {
    return this.aiSourceMapService.update(+id, updateAiSourceMapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiSourceMapService.remove(+id);
  }

  @Get('stream')
  streamEvents(@Req() req: Request, @Res() res: Response): void {
    const handler = (data: string) => {
      res.write(`data: ${data}\n\n`);
    };

    this.aiSourceMapService.onMessage(handler);

    req.on('close', () => {
      this.aiSourceMapService.removeHandler(handler);
      res.end();
    });
  }
}
