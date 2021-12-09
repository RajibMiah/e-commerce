import {useSWRInfinite} from "swr";
import {AuthState} from "redux/auth/reducer";

type RootState = {
    auth: AuthState;
}

class NetworkError extends Error {
    info: any;
    status: number;
}

const fetcher = async (url) => {
    const res = await fetch(url, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("access_token")}`,
        },
    });
    if (!res.ok) {
        const error = new NetworkError("An error occurred while fetching the data.");
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
};


export const useOrder = (props) => {
    const {page_size = 1} = props
    const getKey = (index: number = 0) => {
        let queryParams = new URLSearchParams();
        queryParams.append("page", (index + 1).toString());
        queryParams.append("page_size", page_size.toString());
        return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/v1/orders/?` + queryParams;
    }

    const {data, error, size, setSize, mutate, isValidating} = useSWRInfinite(getKey, fetcher);

    const userOrder = data ? data.flatMap(item => item.results) : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");
    const isReachingEnd = data && data[data.length - 1]?.links?.next == null;
    const isRefreshing = isValidating && data && data.length === size;

    const fetchMore = () => setSize(size + 1)

    return {
        isLoading: isLoadingMore,
        isReachingEnd,
        isRefreshing,
        data: userOrder,
        error,
        mutate,
        fetchMore,
    };
}