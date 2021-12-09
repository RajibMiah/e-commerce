import {Image} from "./image";

export type ProductReview = {
    id: number;
    user: {
        first_name: string;
        last_name: string;
        avatar: string;
    };
    variant: number;
    rating: number;
    message: string;
    images: Image[];
    created_at: Date;
    updated_at: Date;
};
