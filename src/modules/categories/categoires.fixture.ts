import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { Subcategory } from "../subcategories/entities/subcategory.entity";
import { categories } from "src/utils/data.fixture";

@Injectable()
export class CategoriesFixture {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Subcategory) private subcategoryRepository: Repository<Subcategory>,
    ) { }

    async execute() {
        try {
            for (let i = 0; i < categories.length; i++) {
                const { subcategories, ...data } = categories[i];
                const categoryAlreadyExists = await this.categoryRepository.findOneBy({ id: categories[i].id, name: categories[i].name, slug: categories[i].slug });
                if (!categoryAlreadyExists) {
                    const category = await this.categoryRepository.save(data);
                    await this.createSubcategories(subcategories, category);
                } else {
                    await this.createSubcategories(subcategories, categoryAlreadyExists);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async createSubcategories(subcategories: Subcategory[], category: Category) {
        try {
            for (let i = 0; i <= subcategories.length; i++) {
                const subcategoryAlreadyExists = await this.subcategoryRepository.findOneBy({ id: subcategories[i]?.id, name: subcategories[i]?.name, slug: subcategories[i]?.slug });
                if (!subcategoryAlreadyExists) {
                    await this.subcategoryRepository.save({
                        ...subcategories[i],
                        category
                    });
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}