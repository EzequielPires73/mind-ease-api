import { Collection } from "src/modules/collections/entities/collection.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


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

    @ManyToOne(() => Collection, collection => collection.files, {nullable: false})
    collection: Collection;
}
