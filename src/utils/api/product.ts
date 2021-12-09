import { Product } from "types/product";

const BASE_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

type ProductResponse = {
    links: {
        next: string | null;
        previous: string | null;
    };
    count: number;
    results: Product[];
}

interface Props {
    page_size?: number;
    page?: number;
}

export async function getProducts(variables: Props): Promise<Product[]> {
    const { page_size = 10, page = 1 } = variables ?? {};

    const response: Response = await fetch(
        `${BASE_URL}/api/product/v1/products/?` + new URLSearchParams({
            page: page.toString(),
            page_size: page_size.toString(),
        })
    );
    const { results }: ProductResponse = await response.json();

    if (response.ok) {
        return results;
    } else {
        const errorMessage = "There is some errors!";
        return Promise.reject(errorMessage);
    }
}

export async function getProductItem(productId: number){

    const response: Response = await fetch(`${BASE_URL}/api/product/v1/products/${productId}/`);
    const result: Product = await response.json();

    if (response.ok) {
        return result;
    } else {
        const errorMessage = "There is some errors!";
        return Promise.reject(errorMessage);
    }
}