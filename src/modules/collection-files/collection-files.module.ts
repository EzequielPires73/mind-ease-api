import { Module } from '@nestjs/common';
import { CollectionFilesService } from './collection-files.service';
import { CollectionFilesController } from './collection-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionFile } from './entities/collection-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionFile])],
  controllers: [CollectionFilesController],
  providers: [CollectionFilesService],
})
export class CollectionFilesModule {}
