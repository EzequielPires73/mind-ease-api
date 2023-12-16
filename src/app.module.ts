import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CollectionFilesModule } from './modules/collection-files/collection-files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UsersModule,
    CollectionsModule,
    CategoriesModule,
    AuthModule, 
    SubcategoriesModule, 
    CollectionFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
