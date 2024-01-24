import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CytestModule } from './cytest/cytest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cytest } from './cytest/entities/cytest.entity';
import { AiSourceMapModule } from './ai-source-map/ai-source-map.module';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ASDasd123!!',
      database: 'cytest',
      entities: [Cytest],
      synchronize: true,
    }),
    CytestModule,
    AiSourceMapModule,
    ChatGptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
