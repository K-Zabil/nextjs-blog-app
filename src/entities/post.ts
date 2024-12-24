export type Post = {
    id: string;
    title: string;
    description: string;
    category: Category | string;
    price: number;
    date: Date;
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