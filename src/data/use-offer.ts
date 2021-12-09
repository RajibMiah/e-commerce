import useSWR from "swr";
import { useSelector } from "react-redux";
import { AuthState } from "redux/auth/reducer";

type RootState = {
    auth: AuthState;
}

class NetworkError extends Error {
    info: any;
    status: number;
}

const fetcher = (url) => fetch(url).then((res) => res.json());


export const  useOffer  = () => {
    const { access_token } = useSelector((state: RootState) => state.auth);

    const getUrl = () =>  `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/discount/v3/offers/banner/`;

    const { data, mutate, error } = useSWR([getUrl(), access_token], fetcher);

    const orders = data?.results ?? [];
    const isLoading = !data && !error;

    return {
        loading: isLoading,
        error,
        offer:data,
        mutate,
    };
}