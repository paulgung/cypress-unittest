import { Injectable } from '@nestjs/common';
import { CreateChatGptDto } from './dto/create-chat-gpt.dto';
import { UpdateChatGptDto } from './dto/update-chat-gpt.dto';
// import FormData from 'form-data';
const FormData = require('form-data');


@Injectable()
export class ChatGptService {
  create(createChatGptDto: CreateChatGptDto) {
    return 'This action adds a new chatGpt';
  }

  findAll() {
    const form = new FormData();

    form.append('gsx', 'gsx');
    console.log('弓少旭想看看form', form);
    return `This action returns all chatGpt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatGpt`;
  }

  update(id: number, updateChatGptDto: UpdateChatGptDto) {
    return `This action updates a #${id} chatGpt`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatGpt`;
  }
}
