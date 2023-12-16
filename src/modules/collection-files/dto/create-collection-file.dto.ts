import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CollectionFileType } from "../entities/collection-file.entity";

export class CreateCollectionFileDto {
    @ApiPropertyOptional()
    name: string;
    
    @ApiProperty({
        enum: CollectionFileType,
        default: CollectionFileType.audio
    })
    type: CollectionFileType;

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional()
    path: string;

    @ApiPropertyOptional()
    size: number;

    @ApiPropertyOptional()
    thumbnail_path: string;

    @ApiProperty()
    collectionId: number;
}
