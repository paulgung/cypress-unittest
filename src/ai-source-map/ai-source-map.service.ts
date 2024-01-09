import { Injectable } from '@nestjs/common';
import { CreateAiSourceMapDto } from './dto/create-ai-source-map.dto';
import { UpdateAiSourceMapDto } from './dto/update-ai-source-map.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as sourceMap from 'source-map';
import axios from 'axios';
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

  async aiSourcemapParse(aiSourceMap) {
    // 构建 .map 文件的绝对路径
    const mapFilePath = path.join(
      '/Users/paulgung/workspace/sourcemap-react-vite/dist/assets/index-KSB-9Be7.js.map',
    );

    // 读取 .map 文件内容
    const rawSourceMap = JSON.parse(fs.readFileSync(mapFilePath, 'utf-8'));

    // 创建 SourceMapConsumer 对象
    const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);
    // 替换为实际的报错行数和列数
    const errorLine = 40;
    const errorColumn = 57484;

    // 通过源映射查找源代码位置
    const originalPosition = consumer.originalPositionFor({
      line: errorLine, // 替换为你要查找的行号
      column: errorColumn, // 替换为你要查找的列号
    });
    console.log('originalPositionoriginalPosition', originalPosition);

    // 使用源映射还原源代码
    const originalSource = consumer.sourceContentFor(originalPosition.source);

    const sourceLines = originalSource.split('\n');

    let codes = ``;
    for (let i = 0; i < sourceLines.length; i++) {
      const line = sourceLines[i];
      const lineNumber = 1 + i;
      codes += `${lineNumber}: ${line}\n`;
    }
    const prompts =
      `请你扮演一名前端工程师,现在有一个紧急线上bug,我给你提供源代码,以及报错位置(行数以及列数),请你帮我找出代码bug,以下是源代码:\n` +
      `${codes}\n` +
      `报错代码行数：${originalPosition.line},\n` +
      `报错代码列数：${originalPosition.column}`;

    return await axios.post(
      'https://frontend.myhexin.com/kingfisher/robot/homeworkChat',
      {
        content: prompts,
        source: 'homework-47-wangxiaolong',
        token: '610EE45BF-Qtc2VydmU=',
        temperature: 1,
      },
    );
  }

  async aiErrorStackParse() {
    // 错误栈
    const error_stack = `Uncaught (in promise) Error: Unknown Component: interaction.tooltipThumb
    at In (helper.js:33:11)
    at l (library.js:20:32)
    at eval (library.js:24:16)
    at CO (plot.js:402:25)
    at eval (plot.js:195:41)
    at Generator.next (<anonymous>)
    at m (plot.js:4:58)`;

    // prompt
    const prompts =
      `请你扮演一名前端工程师,现在有一个紧急线上bug,我给你提供错误栈,请你帮我分析bug原因,以下是错误栈:\n` +
      `${error_stack}\n`;

    return await axios.post(
      'https://frontend.myhexin.com/kingfisher/robot/homeworkChat',
      {
        content: prompts,
        source: 'homework-47-wangxiaolong',
        token: '610EE45BF-Qtc2VydmU=',
        temperature: 1,
      },
    );
  }
}
