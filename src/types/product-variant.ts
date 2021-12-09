//import {Image} from "./image";
import {ProductReview} from "./product-review";
import { Category } from "types/category";

export type ProductVariant = {
    id: number;
    product: number;
    is_leaf:boolean;
    title: string;
    sku: string;
    slug:string;
    original_price: string;
    sale_price: string;
    discount: number;
    is_featured: boolean;
    rating: number;
    images:any;
    image?: any;
    tags: string[];
    review: ProductReview | null;
    measurement: string;
    measurement_value: number;
    measurement_unit: number;
    max_allocation: number;
    created_at: Date;
    updated_at: Date;
    supplier?:string;

    // TODO: temp. fields, need to remove later.
    description?: string;
    categories?: Category[];
    type?: string;
};
