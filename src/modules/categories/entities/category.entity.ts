import { Subcategory } from "src/modules/subcategories/entities/subcategory.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name', 'slug'])
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @OneToMany(() => Subcategory, subcategory => subcategory.category)
    subcategories: Subcategory[];
}
