import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  async findAll() {
    try {
      const [results, total] = await this.categoryRepository.findAndCount({relations: ['subcategories', 'subcategories.collections', 'subcategories.collections.files'], order: {id: 'ASC'}});
      
      return {
        success: true,
        results,
        total
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
