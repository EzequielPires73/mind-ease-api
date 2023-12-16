import { Category } from "src/modules/categories/entities/category.entity";
import { Collection } from "src/modules/collections/entities/collection.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name', 'slug'])
export class Subcategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column({nullable: true})
    image?: string;

    @ManyToOne(() => Category, category => category.subcategories)
    category?: Category;
    
    @OneToMany(() => Collection, collection => collection.subcategory)
    collections?: Collection[];
}
