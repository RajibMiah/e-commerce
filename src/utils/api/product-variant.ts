import { ProductVariant } from "types/product-variant";
import {useSelector} from "react-redux";
import useSWR from "swr";

const BASE_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

type ProductVariantsResponse = {
    links: {
        next: string | null;
        previous: string | null;
    };
    count: number;
    results: ProductVariant[];
}

type Props = {
    text?: string;
    product?: number;
    categories?: number[];
    is_featured?: boolean;
    page_size?: number;
    page?: number;
}


const fetcher = async (url) => await fetch(url).then((res) => res.json());


export const  getProductVariantItem  =  (variantId: any) => {


    const { data, mutate, error } =  useSWR( `${BASE_URL}/api/product/v1/product-variants/${variantId}/`, fetcher);

    const productVariant = data ?? [];
    const isLoading = !data && !error;
    return {
        loading: isLoading,
        error,
        data:productVariant,
        mutate,
    };
}

export async function getProductVariants(variables: Props): Promise<ProductVariant[]> {
    const { text, product, categories, is_featured, page_size = 10, page = 1 } = variables ?? {};
    const response: Response = await fetch(
        `${BASE_URL}/api/product/v1/product-variants/?` + new URLSearchParams({
            page: page.toString(),
            page_size: page_size.toString(),
            // categories:
        })
    );
    const { results }: ProductVariantsResponse = await response.json();

    if (response.ok) {
        return results;
    } else {
        const errorMessage = "There is some errors!";
        return Promise.reject(errorMessage);
    }
}

// export async function getProductVariantItem(variantId: number): Promise<ProductVariant> {
//     console.log("getProductVariantItem called..");
//
//     const response: Response = await fetch(`${BASE_URL}/api/product/v1/product-variants/${variantId}/`);
//     // const response: Response = await fetch(`${BASE_URL}/api/product/v1/products/${variantId}/`);
//     const result: ProductVariant = await response.json();
//
//
//     if (response.ok) {
//         return result;
//     } else {
//         const errorMessage = "There is some errors!";
//         return Promise.reject(errorMessage);
//     }
// }

export async function getProductItem(productId: number): Promise<ProductVariant> {
    console.log("get product called..");
    const response: Response = await fetch(`${BASE_URL}/api/product/v1/products/${productId}/`);
    const result: ProductVariant = await response.json();

    if (response.ok) {
        return result;
    } else {
        const errorMessage = "There is some errors!";
        return Promise.reject(errorMessage);
    }
}