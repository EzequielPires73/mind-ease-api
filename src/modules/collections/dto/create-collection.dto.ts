import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCollectionDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
    
    @ApiPropertyOptional()
    image: string;
    
    @ApiProperty()
    subcategoryId: number;
}

