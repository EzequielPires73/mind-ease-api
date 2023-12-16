import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
    @ApiProperty({default: 'ezequiel.pires082000@gmail.com'})
    email: string;

    @ApiProperty({default: 'term228687535'})
    password: string;
}