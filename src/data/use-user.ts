import useSWR from "swr";
import { User } from "types/user";
import { useSelector } from "react-redux";
import { AuthState as AuthState } from "redux/auth/reducer";

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


export default function useUser() {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const getUrl = () => isAuthenticated ? `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/accounts/v1/user/` : null;

    const { data, mutate, error } = useSWR(getUrl, fetcher);

    const user: User = data;
    const isLoading = !data && !error;

    const addOrUpdateContactNumber = async (contact) => {
        console.log(contact, "contact");
        // return await fetch(end_point_url,{method: 'POST', body: contact });
    };
    const addOrUpdateAddress = async (address) => {
        console.log(address, "address");

        // return await fetch(end_point_url,{method: 'POST', body: address });
    };
    const addOrUpdatePaymentCard = async (payment_card) => {
        console.log(payment_card, "payment_card");

        // return await fetch(end_point_url,{method: 'POST', body: payment_card });
    };
    const deleteContactNumber = async (contactId) => {
        console.log(contactId, "contactId");

        // return await fetch(end_point_url,{method: 'POST', body: contactId });
    };
    const deleteAddress = async (addressId) => {
        console.log(addressId, "addressId");

        // return await fetch(end_point_url,{method: 'POST', body: addressId });
    };
    const deletePaymentCard = async (cardId) => {
        console.log(cardId, "cardId");

        // return await fetch(end_point_url,{method: 'POST', body: cardId });
    };

    return {
        // loggedOut,
        user,
        mutate,
        error,
        addOrUpdateContactNumber,
        addOrUpdateAddress,
        addOrUpdatePaymentCard,
        deleteContactNumber,
        deleteAddress,
        deletePaymentCard,
    };
}