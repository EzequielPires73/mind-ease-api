import { ApiProperty } from "@nestjs/swagger";

export class CreateUserFileDto {
    @ApiProperty()
    is_consumed: boolean;

    @ApiProperty()
    progress: number;
}