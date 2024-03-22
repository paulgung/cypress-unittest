import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  CreateAiElkDto,
  GoToAiElkDto,
  AlarmStatus,
  AlarmGrade,
} from './dto/create-aielk.dto';
import fetch from 'node-fetch';

const OneDayMilliSeconds = 24 * 60 * 60 * 1000; // 一天的毫秒数

@Injectable()
export class AiElkService {
  // 获取ELK日志
  async getElkLog(createAielkDto: CreateAiElkDto, indexName: string) {
    const { service, from, to } = createAielkDto;
    if (!service || !from || !to)
      throw new HttpException(
        '不存在elk日志信息, 请检查参数',
        HttpStatus.BAD_REQUEST,
      );

    const response = await fetch(
      `https://apm.myhexin.com/elk/${indexName}/_search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: {
            bool: {
              must: [
                {
                  term: {
                    service,
                  },
                },
                {
                  range: {
                    log_time: {
                      gte: Number(from),
                      lte: Number(to),
                    },
                  },
                },
              ],
            },
          },
        }),
      },
    );

    if (!response.ok) {
      throw new HttpException(
        `Request failed with status ${response.status}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return response.json();
  }

  // ELK排障主方法
  async alertWithUrl(alertInfo: GoToAiElkDto, indexName: string) {
    const { tags, timestamp, status, grade } = alertInfo;
    const { app } = tags;
    // 校验程序名
    if (!app) return '请输入程序名!';

    // 获取当前时间戳（单位：毫秒）
    const to = new Date().getTime();
    // 获取前一天的时间戳
    const from = to - OneDayMilliSeconds;

    const URL = `https://paas.myhexin.com/inspection/aielk?service=${app}&from=${from}&to=${to}`;
    let noticeMessage = '【项目告警提醒】\n';
    noticeMessage += `项目名: ${app}\n`;
    noticeMessage += `告警时间: ${timestamp}\n`;
    noticeMessage += `告警状态: ${AlarmStatus[status]}\n`;
    noticeMessage += `告警等级: ${AlarmGrade[grade]}\n`;
    noticeMessage += `前往ELK日志排障: ${URL}\n`;

    return noticeMessage;
  }
}
