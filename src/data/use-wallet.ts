import useSWR from "swr";
import {useSelector} from "react-redux";
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


export const useWallet = () => {
    const {access_token} = useSelector((state: RootState) => state.auth);

    const getUrl = () => `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/accounts/v1/user/wallet/`;

    const {data, mutate, error} = useSWR(getUrl(), fetcher);

    const wallet = data?.results ?? [];
    const isLoading = !data && !error;

    return {
        loading: isLoading,
        error,
        wallet: data,
        mutate,
    };
}