import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  CreateAiElkDto,
  GoToAiElkDto,
  AlarmStatus,
  AlarmGrade,
} from './dto/create-aielk.dto';
import fetch from 'node-fetch';
import * as dayjs from 'dayjs';

const OneDayMilliSeconds = 24 * 60 * 60 * 1000; // 一天的毫秒数

@Injectable()
export class AiElkService {
  // 获取ELK日志
  async getElkLog(
    createAielkDto: CreateAiElkDto,
    params: { serviceName: string; indexName: string },
  ) {
    const { serviceName, indexName } = params;
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
                    service: serviceName,
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
  async alertWithUrl(
    alertInfo: GoToAiElkDto,
    params: { serviceName: string; indexName: string },
  ) {
    const { serviceName, indexName } = params;
    const { timestamp, status, grade } = alertInfo;
    // 校验程序名
    if (!serviceName) return '请输入程序名!';

    // 使用 Day.js 将时间戳字符串解析为日期对象，然后进行格式化
    const formattedDate = dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');

    // 获取当前时间戳（单位：毫秒）
    const to = new Date().getTime();
    // 获取前一天的时间戳
    const from = to - OneDayMilliSeconds;

    const URL = `https://paas.myhexin.com/inspection/aielk?service=${serviceName}&from=${from}&to=${to}`;
    let noticeMessage = '【项目告警提醒】\n';
    noticeMessage += `项目名: ${serviceName}\n`;
    noticeMessage += `告警时间: ${formattedDate}\n`;
    noticeMessage += `告警状态: ${AlarmStatus[status]}\n`;
    noticeMessage += `告警等级: ${AlarmGrade[grade]}\n`;
    noticeMessage += `Elastic索引: ${indexName}\n`;
    noticeMessage += `前往ELK日志排障: ${URL}\n`;

    return noticeMessage;
  }
}
