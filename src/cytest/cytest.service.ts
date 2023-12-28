import { Injectable } from '@nestjs/common';
import { CreateCytestDto } from './dto/create-cytest.dto';
import { UpdateCytestDto } from './dto/update-cytest.dto';

@Injectable()
export class CytestService {
  create(createCytestDto: CreateCytestDto) {
    return 'This action adds a new cytest';
  }

  findAll() {
    return `This action returns all cytest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cytest`;
  }

  update(id: number, updateCytestDto: UpdateCytestDto) {
    return `This action updates a #${id} cytest`;
  }

  remove(id: number) {
    return `This action removes a #${id} cytest`;
  }
}
