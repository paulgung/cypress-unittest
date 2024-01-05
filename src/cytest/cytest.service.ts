import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cytest } from './entities/cytest.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import * as cypress from 'cypress';
import { CYPRESS_CONFIG } from './config/index';
import { merge } from 'mochawesome-merge';
import generator from 'mochawesome-report-generator';
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

  // 1、写入本地文件
  async writeCodeToFile(code: string): Promise<string> {
    // 生成 UUID 和文件夹路径
    const uuid = uuidv4();
    const dirPath = path.join(process.cwd(), 'cypress', 'e2e', uuid);

    // 确保文件夹存在
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // 设置文件路径为 index.cy.js
    const filePath = path.join(dirPath, 'index.cy.js');

    // 使用文件流异步写入代码
    return new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(filePath);
      fileStream.write(code);
      fileStream.end();

      fileStream.on('finish', () => resolve(dirPath));
      fileStream.on('error', (error) => reject(error));
    });
  }

  // 2-1、跑代码
  async runCypressTest(dirPath: string): Promise<void> {
    try {
      const filePath = path.join(dirPath, 'index.cy.js');
      const htmlPath = path.join(dirPath, 'html');
      const screenshotsPath = path.join(dirPath, 'screenshots');
      const videosPath = path.join(dirPath, 'videos');

      const result = await cypress.run({
        spec: filePath,
        // 这里可以添加其他配置，如浏览器类型等
        ...CYPRESS_CONFIG,
        reporterOptions: {
          ...CYPRESS_CONFIG.reporterOptions,
          reportDir: htmlPath,
        },
        config: {
          video: true,
          videosFolder: videosPath,
          screenshotsFolder: screenshotsPath,
        },
      });
      console.log('result:', result);
    } catch (error) {
      console.error(`执行错误: ${error}`);
    }
  }

  // 2-2、合并报告
  async generateReport() {
    try {
      // 确保报告目录存在
      const reportDir = path.join(__dirname, 'cypress', 'e2e', 'html');
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
      }

      // 合并报告
      const jsonReport = await merge({
        files: [path.join(reportDir, '*.json')],
      });

      // 生成 HTML 报告
      const report = await generator.create(jsonReport, {
        reportDir: reportDir,
        // 可以在这里添加其他 mochawesome 报告生成器的配置选项
      });

      console.log('报告生成成功:', report);
    } catch (error) {
      console.error('报告生成失败:', error);
    }
  }

  //  3、汇总方法
  async processCodeBlock(id: number): Promise<void> {
    const codeBlock = await this.getCodeBlockById(id);
    console.log('codeBlock', codeBlock);
    if (codeBlock) {
      const dirPath = await this.writeCodeToFile(codeBlock);
      await this.runCypressTest(dirPath);
      // await this.generateReport();
    } else {
      console.log('没有找到对应的 code_block');
    }
  }
}
