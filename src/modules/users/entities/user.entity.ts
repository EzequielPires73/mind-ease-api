import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hashSync } from "bcrypt";
import { UserRoles } from "./user-roles.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column({type: 'simple-enum', enum: UserRoles, default: UserRoles.USER})
    role: UserRoles;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}
