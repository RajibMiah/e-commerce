export type Category = {
    id: number;
    parent: number | null;
    is_leaf: boolean;
    title: string;
    slug: string;
    description: string;
    item_count: number;
    image: string;
    alt: string;
    tax: number;
    children: Category[];
    created_date: Date;
    modified_date: Date;
};
