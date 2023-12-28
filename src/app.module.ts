import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CytestModule } from './cytest/cytest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ASDasd123!!',
      database: 'cytest',
      entities: [],
      synchronize: true,
    }),
    CytestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
