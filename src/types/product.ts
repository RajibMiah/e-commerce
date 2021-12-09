import {ProductVariant} from "./product-variant";

export type Product = {
    id: number;
    categories: number[];
    title: string;
    slug: string;
    description: string;
    tax: number;
    variants: ProductVariant[];
    default_variant: ProductVariant | null;
    created_date: Date;
    modified_date: Date;
};
