import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hashSync } from "bcrypt";
import { UserRoles } from "./user-roles.enum";
import { UserFileProgress } from "src/modules/collection-files/entities/collection-file.entity";

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

    @OneToMany(() => UserFileProgress, userFileProgress => userFileProgress.user)
    fileProgresses: UserFileProgress[];

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}
