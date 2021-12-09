import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

interface QueryParams {
    nested?: boolean;
}

export default function useCategory(params: QueryParams) {
    const { nested  } = params;

    const getUrl = () => {
        let queryParams = new URLSearchParams();

        if (nested && nested === true) {
            queryParams.append("nested", "true");
        }

        return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/product/v1/categories/?` + queryParams;
    };

    const { data, mutate, error } = useSWR(getUrl, fetcher);

    const categories = data ?? [];
    const isLoading = !data && !error;
    return {
        isLoading,
        data: categories,
        error,
        mutate,
    };
}


export async function getStaticCategories(): Promise<any> {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/product/v1/categories/?nested=true` );
    const result = await response.json();
    if (response.ok) {
        return result;
    } else {
        const errorMessage = "There is some errors!";
        return Promise.reject(errorMessage);
    }
}
