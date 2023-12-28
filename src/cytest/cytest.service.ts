import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cytest } from './entities/cytest.entity';

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
  async findOne(uuid: string): Promise<Cytest> {
    return this.cytestRepository.findOne({ where: { uuid } });
  }

  // 更新 Cytest 记录
  async update(
    uuid: string,
    cytestUpdateData: Partial<Cytest>,
  ): Promise<Cytest> {
    await this.cytestRepository.update(uuid, cytestUpdateData);
    return this.cytestRepository.findOne({ where: { uuid } });
  }

  // 删除 Cytest 记录
  async remove(uuid: string): Promise<void> {
    await this.cytestRepository.delete(uuid);
  }
}
