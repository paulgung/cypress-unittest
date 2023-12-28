import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cytest } from './entities/cytest.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

@Injectable()
export class CytestService {
  constructor(
    @InjectRepository(Cytest)
    private cytestRepository: Repository<Cytest>,
  ) {}

  // 创建新的 Cytest 记录
  async create(cytestData: Partial<Cytest>): Promise<Cytest> {
    const newCytest = this.cytestRepository.create(cytestData);
    return this.cytestRepository.save(newCytest);
  }

  // 查找所有 Cytest 记录
  async findAll(): Promise<Cytest[]> {
    return this.cytestRepository.find();
  }

  // 根据 ID 查找单个 Cytest 记录
  async findOne(id: number): Promise<Cytest> {
    console.log('id', id);
    return this.cytestRepository.findOne({ where: { id } });
  }

  // 更新 Cytest 记录
  async update(id: number, cytestUpdateData: Partial<Cytest>): Promise<Cytest> {
    await this.cytestRepository.update(id, cytestUpdateData);
    return this.cytestRepository.findOne({ where: { id } });
  }

  // 删除 Cytest 记录
  async remove(id: number): Promise<void> {
    await this.cytestRepository.delete(id);
  }

  // 获取代码块
  async getCodeBlockById(id: number): Promise<string | null> {
    const cytest = await this.cytestRepository.findOne({ where: { id } });
    return cytest ? cytest.code_block : null;
  }

  // 写入本地文件
  async writeCodeToFile(code: string): Promise<string> {
    const filename = uuidv4() + '.js';
    const filePath = path.join(__dirname, '..', 'code', filename);
    fs.writeFileSync(filePath, code);
    return filePath;
  }

  // 跑代码
  async runCypressTest(filePath: string): Promise<void> {
    const command = `npx cypress run --spec "${filePath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`);
        return;
      }
      console.log(`标准输出: ${stdout}`);
      console.error(`标准错误: ${stderr}`);
    });
  }

  //  汇总方法
  async processCodeBlock(id: number): Promise<void> {
    const codeBlock = await this.getCodeBlockById(id);
    console.log('codeBlock', codeBlock);
    if (codeBlock) {
      const filePath = await this.writeCodeToFile(codeBlock);
      await this.runCypressTest(filePath);
    } else {
      console.log('没有找到对应的 code_block');
    }
  }
}
