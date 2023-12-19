import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseIntPipe, UploadedFile } from '@nestjs/common';
import { CollectionFilesService } from './collection-files.service';
import { CreateCollectionFileDto } from './dto/create-collection-file.dto';
import { UpdateCollectionFileDto } from './dto/update-collection-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file-name';
import { audioVideoFileFilter, imageFileFilter } from 'src/helpers/file-filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Collection Files')
@Controller('collection-files')
export class CollectionFilesController {
  constructor(private readonly collectionFilesService: CollectionFilesService) {}

  @Post()
  create(@Body() createCollectionFileDto: CreateCollectionFileDto) {
    return this.collectionFilesService.create(createCollectionFileDto);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './storage/files',
      filename: editFileName,
    }),
    fileFilter: audioVideoFileFilter
  }))
  upload(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    return this.collectionFilesService.uploadFile(id, file);
  }
  
  @Post('upload-thumbnail/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './storage/files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter
  }))
  uploadThumbnail(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    return this.collectionFilesService.uploadThumbnail(id, file);
  }

  @Get()
  findAll() {
    return this.collectionFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionFilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionFileDto: UpdateCollectionFileDto) {
    return this.collectionFilesService.update(+id, updateCollectionFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionFilesService.remove(+id);
  }
}
