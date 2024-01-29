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
import { ChatGptService } from './chat-gpt.service';
import { CreateChatGptDto } from './dto/create-chat-gpt.dto';
import { UpdateChatGptDto } from './dto/update-chat-gpt.dto';
import { Sse } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Controller('chat-gpt')
export class ChatGptController {
  private clients: Response[] = [];

  constructor(private readonly chatGptService: ChatGptService) {}

  @Post()
  create(@Body() createChatGptDto: CreateChatGptDto) {
    return this.chatGptService.create(createChatGptDto);
  }

  @Sse('sse')
  sse(): Observable<{ data: any }> {
    return interval(1000).pipe(
      map(() => ({ data: { message: 'Hello from server' } })),
    );
  }

  @Post('sse-post')
  sse_post(@Req() req, @Res() res: Response, @Body() body) {
    const prompt = body.prompt;

    // 设置响应头，指定SSE格式
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 发送SSE数据，可以根据需要发送不同的内容
    res.write(`data: This is an SSE message with prompt: ${prompt}\n\n`);

    // 设置响应结束时的处理
    req.on('close', () => {
      // 在连接关闭时执行清理操作，如删除定时器等
      // 如果客户端断开连接，这个回调会被调用
      console.log('Connection closed');
      res.end();
    });
  }
}
