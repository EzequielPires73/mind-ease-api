import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesFixture } from './categoires.fixture';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Subcategory])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesFixture],
})
export class CategoriesModule {
  constructor(categoriesFixtures: CategoriesFixture) {
    categoriesFixtures.execute();
  }
}
