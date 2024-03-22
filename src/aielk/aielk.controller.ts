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
  @Post('v1/get_elk/:index_name?')
  getElkLog(
    @Body() createAielkDto: CreateAiElkDto,
    @Param('index_name') indexName = 'mobile-archive-am-skywalking-log-json-*',
  ) {
    const params = { indexName };
    return this.aiElkService.getElkLog(createAielkDto, params);
  }

  @Post('v1/alert_recall/:index_name/:service_name')
  alertRecall(
    @Body() goToAiElkDto: GoToAiElkDto,
    @Param('index_name') indexName: string,
    @Param('serivce_name') serviceName: string,
  ) {
    const params = { indexName, serviceName };
    return this.aiElkService.alertWithUrl(goToAiElkDto, params);
  }
}
