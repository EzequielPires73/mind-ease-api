import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection) private collectionRepository: Repository<Collection>
  ) { }

  async create(createCollectionDto: CreateCollectionDto) {
    try {
      const slug = slugify(createCollectionDto.name, { lower: true });
      const collection = this.collectionRepository.create({ ...createCollectionDto, slug, subcategory: { id: createCollectionDto.subcategoryId } });

      return {
        success: true,
        message: `Coleção com o nome de ${collection.name} criada com sucesso`,
        result: await this.collectionRepository.save(collection),
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findAll() {
    try {
      const [results, total] = await this.collectionRepository.findAndCount();

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

  async findOne(id: number) {
    try {
      const collectionAlreadExists = await this.collectionRepository.findOne({ where: {id}, relations: ['files'] });
      if (!collectionAlreadExists) throw new Error(`Coleção com o id ${id} não encontrada.`);

      return {
        success: true,
        result: collectionAlreadExists
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    try {
      const slug = slugify(updateCollectionDto.name, { lower: true });

      const collectionAlreadExists = await this.collectionRepository.findOneBy({ id });
      if (!collectionAlreadExists) throw new Error(`Coleção com o id ${id} não encontrada.`);

      await this.collectionRepository.update(id, { ...updateCollectionDto, slug, subcategory: { id: updateCollectionDto.subcategoryId } });

      return {
        success: true,
        message: `Coleção com o id ${id} atualizada com sucesso.`,
        result: await this.collectionRepository.findOneBy({ id })
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async remove(id: number) {
    try {
      const collectionAlreadExists = await this.collectionRepository.findOneBy({ id });
      if (!collectionAlreadExists) throw new Error(`Coleção com o id ${id} não encontrada.`);

      await this.collectionRepository.delete(id);

      return {
        success: true,
        message: `Coleção com o id ${id} removida com sucesso.`
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
