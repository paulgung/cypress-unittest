import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AielkService } from './aielk.service';
import { CreateAielkDto } from './dto/create-aielk.dto';

@Controller('aielk')
export class AielkController {
  constructor(private readonly aielkService: AielkService) {}

  @Post()
  getElkLog(@Body() createAielkDto: CreateAielkDto) {
    return this.aielkService.getElkLog(createAielkDto);
  }
}
