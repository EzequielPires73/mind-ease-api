import { Injectable } from '@nestjs/common';
import { CreateCollectionFileDto } from './dto/create-collection-file.dto';
import { UpdateCollectionFileDto } from './dto/update-collection-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionFile } from './entities/collection-file.entity';

@Injectable()
export class CollectionFilesService {
  constructor(
    @InjectRepository(CollectionFile) private collectionFilesRepository: Repository<CollectionFile>
  ) {}

  async create(createCollectionFileDto: CreateCollectionFileDto) {
    try {
      const collectionFile = this.collectionFilesRepository.create({...createCollectionFileDto, collection: {id: createCollectionFileDto.collectionId}});

      return {
        success: true,
        result: await this.collectionFilesRepository.save(collectionFile)
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
      const [results, total] = await this.collectionFilesRepository.findAndCount(); 

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

  async uploadFile(id: number, file: Express.Multer.File) {
    try {
      if(!file) throw new Error('É necessário um arquivo de audio ou vídeo');

      const collectionFile = await this.collectionFilesRepository.findOneBy({id});
      if(!collectionFile) throw new Error(`Arquivo de Coleção não existe com o id ${id}.`);

      const path = file.path;
      const size = file.size;

      await this.collectionFilesRepository.update(id, {
        path,
        size
      })

      return {
        success: true,
        message: 'Upload realizado com sucesso.',
        path: file.path
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
      const collectionFile = await this.collectionFilesRepository.findOneBy({id});
      if(!collectionFile) throw new Error(`Arquivo de Coleção não existe com o id ${id}.`);

      return {
        success: true,
        result: collectionFile,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(id: number, updateCollectionFileDto: UpdateCollectionFileDto) {
    try {
      const collectionFile = await this.collectionFilesRepository.findOneBy({id});
      if(!collectionFile) throw new Error(`Arquivo de Coleção não existe com o id ${id}.`);

      await this.collectionFilesRepository.update(id, updateCollectionFileDto);

      return {
        success: true,
        message: 'Arquivo de coleção atualizado com sucesso.',
        result: await this.collectionFilesRepository.findOneBy({id}),
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
      const collectionFile = await this.collectionFilesRepository.findOneBy({id});
      if(!collectionFile) throw new Error(`Arquivo de Coleção não existe com o id ${id}.`);

      await this.collectionFilesRepository.delete(id);

      return {
        success: true,
        message: 'Arquivo de coleção removido com sucesso.'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
