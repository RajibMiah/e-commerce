import useSWR, {useSWRInfinite} from "swr";


const fetcher = async (url) => await fetch(url).then((res) => res.json());

class NetworkError extends Error {
    info: any;
    status: number;
}

interface QueryParams {
    variantId?: number;
    page_size?: number
}

export const useReview = (params: QueryParams) => {
    const {variantId} = params;
    const getUrl = () => {
        let queryParams = new URLSearchParams();

        if (variantId) queryParams.append('variant', variantId.toString())

        return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/product/v1/reviews/?` + queryParams;
    };

    const {data, mutate, error} = useSWR(getUrl, fetcher);
    const reviews = data ?? [];
    const loading = !data && !error;

    return {
        loading,
        reviews,
        error,
        mutate,
    };
}

export const useReviewInfinityScroll = (params: QueryParams) => {
    const {variantId, page_size} = params;
    const getUrl = (index: number = 0) => {
        let queryParams = new URLSearchParams();

        if (variantId) queryParams.append('variant', variantId.toString())
        queryParams.append("page", (index + 1).toString());
        queryParams.append("page_size", page_size.toString());
        return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/product/v1/reviews/?` + queryParams;
    };

    const {data, error, size, setSize, mutate, isValidating} = useSWRInfinite(getUrl, fetcher);

    const reviews = data ? data.flatMap(item => item.results) : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");
    const isReachingEnd = data && data[data.length - 1]?.links.next == null;
    const isRefreshing = isValidating && data && data.length === size;

    const fetchMore = () => setSize(size + 1)

    return {
        isLoading: isLoadingMore,
        isReachingEnd,
        isRefreshing,
        reviews,
        error,
        mutate,
        fetchMore,
    }
}

const fetcherItems = async (url) => {
    const res = await fetch(url, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("access_token")}`,
        }
    });
    if (!res.ok) {
        const error = new NetworkError("An error occurred while fetching the data.");
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
};

export const usePurchaseVariant = ({is_reviewed}) => {
    const getUrl = (is_reviewed = 'default') => {
        if (is_reviewed === 'default') {
            return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/product/v1/product-variants/?is_purchased=true`;
        } else {
            let queryParams = new URLSearchParams();
            queryParams.append("is_reviewed", is_reviewed);
            return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/product/v1/product-variants/?` + queryParams;
        }

    };

    const {data, mutate, error} = useSWR(getUrl(is_reviewed), fetcherItems);
    const variants = data ?? [];
    const loading = !data && !error;

    return {
        loading,
        variants,
        error,
        mutate,
    };
}