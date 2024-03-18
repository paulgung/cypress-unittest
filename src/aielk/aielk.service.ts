import { Injectable } from '@nestjs/common';
import { CreateAielkDto } from './dto/create-aielk.dto';
import fetch from 'node-fetch';

@Injectable()
export class AielkService {
  async getElkLog(createAielkDto: CreateAielkDto) {
    console.log(createAielkDto);
    const { service, from, to } = createAielkDto;
    if (!service || !from || !to) return '不存在elk日志信息';
    const response = await fetch(
      'https://apm.myhexin.com/elk/mobile-archive-am-skywalking-log-json-*/_search',
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
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }
}
