export type Post = {
    id: string;
    title: string;
    description: string;
    category: Category;
    price: number;
};

export enum Category {
    Technology,
    Health,
    Finance,
    Lifestyle,
    Travel,
    Education,
    Entertainment,
    Science,
};