import { Category } from "types/category";

const BASE_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

interface Props {
    nested?: boolean;
}

export async function getCategories(variables: Props): Promise<Category[]> {
    const { nested = true } = variables ?? {};

    const response: Response = await fetch(
        `${BASE_URL}/api/product/v1/categories/?` + new URLSearchParams({
            nested: nested.toString(),
        })
    );
    const categories: Category[] = await response.json();

    if (response.ok) {
        return categories;
    } else {
        const errorMessage = "There is some errors!";
        return Promise.reject(errorMessage);
    }
}
