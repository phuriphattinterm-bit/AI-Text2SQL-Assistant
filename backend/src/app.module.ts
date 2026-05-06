import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type:'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? '123456789',
      database: process.env.DB_NAME ?? 'ai_inventory_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],  
      synchronize: false
    }),

    AiModule,

    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
