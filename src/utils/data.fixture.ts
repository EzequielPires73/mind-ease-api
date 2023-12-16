import { Category } from "src/modules/categories/entities/category.entity";

export const categories: Category[] = [
    {
        id: 1,
        name: 'Destaques',
        slug: 'destaques',
        subcategories: [
            {
                id: 1,
                name: 'Diminuir o Stress',
                slug: 'diminuir-o-stress',
                image: 'assets/illustrations/destaque-01.png',
            },
            {
                id: 2,
                name: 'Controlar a Ansiedade',
                slug: 'controlar-a-ansiedade',
                image: 'assets/illustrations/destaque-02.png',
            },
            {
                id: 3,
                name: 'Ter uma Vida Equilibrada',
                slug: 'ter-uma-vida-equilibrada',
                image: 'assets/illustrations/destaque-03.png',
            },
            {
                id: 4,
                name: 'Dormir melhor',
                slug: 'dormir-melhor',
                image: 'assets/illustrations/destaque-04.png',
            },
            {
                id: 5,
                name: 'Amar e perdoar',
                slug: 'amar-e-perdoar',
                image: 'assets/illustrations/destaque-05.png',
            },
            {
                id: 6,
                name: 'Meditação para crianças',
                slug: 'meditacao-para-criancas',
                image: 'assets/illustrations/destaque-06.png',
            },
        ],
    },
    {
        id: 2,
        name: 'Técnicas de respiração',
        slug: 'tecnicas-de-respiracao',
        subcategories: [
            {
                id: 7,
                name: 'Respiração profunda guiada',
                slug: 'respiracao-profunda-guiada',
                image: 'assets/illustrations/respiracao-01.png',
            },
        ],
    },
    {
        id: 3,
        name: 'Sons para dormir',
        slug: 'sons-para-dormir',
        subcategories: [
            {
                id: 8,
                name: 'Chuva',
                slug: 'chuva',
                image: 'assets/illustrations/sons-01.png',
            },
            {
                id: 9,
                name: 'Oceano',
                slug: 'oceano',
                image: 'assets/illustrations/sons-02.png',
            },
            {
                id: 10,
                name: 'Animais',
                slug: 'animais',
                image: 'assets/illustrations/sons-03.png',
            },
            {
                id: 11,
                name: 'Floresta',
                slug: 'floresta',
                image: 'assets/illustrations/sons-04.png',
            },
        ],
    },
    {
        id: 4,
        name: 'Técnicas de mindfulness',
        slug: 'tecnicas-de-mindfulness',
        subcategories: [
            {
                id: 12,
                name: 'Sessão mindfulness guiada',
                slug: 'sessao-mindfulness-guiada',
                image: 'assets/illustrations/mindfulness.png',
            },
        ],
    },
];