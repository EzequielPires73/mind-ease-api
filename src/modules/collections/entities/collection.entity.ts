import { CollectionFile } from "src/modules/collection-files/entities/collection-file.entity";
import { Subcategory } from "src/modules/subcategories/entities/subcategory.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name', 'slug'])
export class Collection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    slug: string;
    
    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    image: string;

    @ManyToOne(() => Subcategory, subcategory => subcategory.collections, {nullable: false})
    subcategory: Subcategory;

    @OneToMany(() => CollectionFile, collectionFile => collectionFile.collection)
    files: CollectionFile[];
}
