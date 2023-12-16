import { PartialType } from '@nestjs/swagger';
import { CreateCollectionFileDto } from './create-collection-file.dto';

export class UpdateCollectionFileDto extends PartialType(CreateCollectionFileDto) {}
