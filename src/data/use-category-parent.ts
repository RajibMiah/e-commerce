import useSWR from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());

interface QueryParams {
    parentId?: boolean;
}

export default function useCategoryParent(params) {
    const { parentSlug} = params;
    const getUrl = () => {
        let queryParams = new URLSearchParams();

        if (parentSlug) {
            queryParams.append("parent__slug", parentSlug.toString());
        }

        return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/product/v1/categories/?` + queryParams;
    };

    const { data, mutate, error } = useSWR(getUrl, fetcher);

    const categories = data ?? [];
    const isLoading = !data && !error;
    return {
        isLoading,
        parentCategories: categories,
        error,
        mutate,
    };
}