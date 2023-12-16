import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        default: 'Ezequiel Pires e Silva'
    })
    name: string;

    @ApiProperty({
        default: 'ezequiel.pires082000@gmail.com'
    })
    email: string;

    @ApiProperty({
        default: '(64) 99626-8117'
    })
    phone: string;

    @ApiProperty({
        default: 'term228687535'
    })
    password: string;
}
