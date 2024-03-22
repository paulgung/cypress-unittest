import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AiElkService } from './aielk.service';
import { CreateAiElkDto, GoToAiElkDto } from './dto/create-aielk.dto';

@Controller('aielk')
export class AiElkController {
  constructor(private readonly aiElkService: AiElkService) {}
  @Post('v1/get_elk')
  getElkLog(@Body() createAielkDto: CreateAiElkDto) {
    return this.aiElkService.getElkLog(createAielkDto);
  }

  @Post('v1/alert_recall')
  alertRecall(@Body() goToAiElkDto: GoToAiElkDto) {
    return this.aiElkService.alertWithUrl(goToAiElkDto);
  }
}
