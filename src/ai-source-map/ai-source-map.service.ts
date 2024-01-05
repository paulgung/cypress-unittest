import { Injectable } from '@nestjs/common';
import { CreateAiSourceMapDto } from './dto/create-ai-source-map.dto';
import { UpdateAiSourceMapDto } from './dto/update-ai-source-map.dto';
import { fetchEventSource } from '@microsoft/fetch-event-source';

@Injectable()
export class AiSourceMapService {
  private messageHandlers: ((data: string) => void)[] = [];

  create(createAiSourceMapDto: CreateAiSourceMapDto) {
    return 'This action adds a new aiSourceMap';
  }

  findAll() {
    return `This action returns all aiSourceMap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiSourceMap`;
  }

  update(id: number, updateAiSourceMapDto: UpdateAiSourceMapDto) {
    return `This action updates a #${id} aiSourceMap`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiSourceMap`;
  }

  constructor() {
    this.connectToSse('你的 SSE 服务 URL');
  }

  private connectToSse(url: string): void {
    fetchEventSource(url, {
      method: 'GET',
      onmessage: (event) => {
        this.messageHandlers.forEach((handler) => handler(event.data));
      },
      onopen: () => {
        console.log('SSE connection opened');
      },
      onerror: (error) => {
        console.error('SSE error:', error);
      },
    });
  }

  onMessage(handler: (data: string) => void): void {
    this.messageHandlers.push(handler);
  }

  removeHandler(handler: (data: string) => void): void {
    const index = this.messageHandlers.indexOf(handler);
    if (index !== -1) {
      this.messageHandlers.splice(index, 1);
    }
  }
}
