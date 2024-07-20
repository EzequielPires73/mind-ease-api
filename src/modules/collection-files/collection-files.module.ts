import { Module } from '@nestjs/common';
import { CollectionFilesService } from './collection-files.service';
import { CollectionFilesController } from './collection-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionFile, UserFileProgress } from './entities/collection-file.entity';
import { UserFileProgressController } from './user-file-progress.controller';
import { UserFileProgressService } from './user-file-progress.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionFile, UserFileProgress])],
  controllers: [CollectionFilesController, UserFileProgressController],
  providers: [CollectionFilesService, UserFileProgressService],
})
export class CollectionFilesModule {}
