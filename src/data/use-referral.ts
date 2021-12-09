import useSWR from "swr";

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


export const  useReferral  = () => {
    const getUrl = () =>  `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/discount/v3/referral-code/`;

    const { data, mutate, error } = useSWR(getUrl(), fetcher);

    const referral = data?.results ?? [];
    const isLoading = !data && !error;

    return {
        loading: isLoading,
        error,
        referral:data,
        mutate,
    };
}