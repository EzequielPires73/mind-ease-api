import { Collection } from "src/modules/collections/entities/collection.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


export enum CollectionFileType {
    audio = 'audio',
    video = 'video'
}

@Entity()
export class CollectionFile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'simple-enum', enum: CollectionFileType})
    type: CollectionFileType;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    path: string;

    @Column({nullable: true})
    size: number;

    @Column({nullable: true})
    thumbnail_path: string;

    @ManyToOne(() => Collection, collection => collection.files, {nullable: false, onDelete: 'CASCADE'})
    collection: Collection;

    @OneToMany(() => UserFileProgress, userFileProgress => userFileProgress.file)
    userProgresses: UserFileProgress[];
}

@Entity()
@Unique(['user', 'file'])
export class UserFileProgress {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.fileProgresses, {nullable: false, onDelete: 'CASCADE'})
    user: User;

    @ManyToOne(() => CollectionFile, file => file.userProgresses, {nullable: false, onDelete: 'CASCADE'})
    file: CollectionFile;

    @Column({default: false})
    is_consumed: boolean;

    @Column({type: 'float', default: 0})
    progress: number;
}