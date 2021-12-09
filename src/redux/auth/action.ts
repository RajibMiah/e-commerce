import * as types from "./types";
import {User} from "types/user";
import {Address} from "types/address";
import {Contact} from "types/contact";
import {isBrowser} from "redux/utils";


export const toggleSignInForm = () => ({type: types.SIGN_IN});

export const signIn = (access_token, onSuccess?, onError?) => async dispatch => {

    const url = `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/accounts/v1/login/google/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({access_token})
    });

    // await delay(5000);

    if (!response.ok) {
        onError?.(response);
        return;
    }

    const {key: serverToken} = await response.json();

    if (isBrowser) { // TODO: This condition check might be redundant!
        localStorage.setItem("access_token", serverToken);

        dispatch({
            type: types.SIGN_IN_SUCCESS,
            payload: serverToken
        });

        // After successful sign-in, we need to execute the callback.
        onSuccess?.();
        dispatch(getUserProfile(serverToken, null));
    }
};

export const signOut = () => ({type: types.SIGN_OUT});

/**
 * PROFILE RELATED ACTIONS
 */
export const getUserProfile = (access_token, onFetchSuccess) => async dispatch => {
    const url = `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/accounts/v1/user/`;
    const response = await fetch(url, {
        headers: {
            "Authorization": `Token ${access_token}`,
        }
    });
    if (response.ok) {
        const user: User = await response.json();

        const isBrowser = typeof window !== "undefined";
        if (isBrowser) {
            dispatch({
                type: types.PROFILE_FETCH_SUCCESS,
                payload: user
            });

            dispatch(setDefaultAddress(user.default_shipping_address));

            if (user.phone) {
                dispatch(setDefaultContact({
                    type: "primary",
                    number: user.phone,
                    isVerified: user.is_phone_verified
                }));
            }
            onFetchSuccess?.();
        }
    } else {
        dispatch(signOut())
        // TODO: render some error message.
    }
};

export const checkProfile= () => async dispatch=> {
    const url = `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/accounts/v1/user/`;
    const response = await fetch(url, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("access_token")}`,
        },
    });
    if (response.status === 401 || response.status === 403) {
        dispatch(signOut())
    }
}

/**
 * Wallet related action
 */
export const addReferralInfo = (referral: { Referral }) => ({
    type: types.ADD_REFERRAL_INFO,
    payload: referral
})
export const updateTotalReferee = (totalMaxReferee: number) => ({
    type: types.UPDATE_CURRENT_REFEREE,
    payload: totalMaxReferee
})


/**
 * ADDRESS RELATED ACTIONS
 */
export const setDefaultAddress = (address: Address) => ({
    type: types.ADD_OR_UPDATE_ADDRESS,
    payload: {...address, type: "primary", name: "Default"}
});

export const setPrimaryAddress = (id: number | string) => ({
    type: types.SET_PRIMARY_ADDRESS,
    payload: id
});

export const addOrUpdateAddress = (address: Address) => ({
    type: types.ADD_OR_UPDATE_ADDRESS,
    payload: address
});

export const deleteAddress = (id: number | string) => ({
    type: types.DELETE_ADDRESS,
    payload: id
});

/**
 * CONTACT RELATED ACTIONS
 */
export const setDefaultContact = (contact: Contact) => ({
    type: types.ADD_OR_UPDATE_CONTACT,
    payload: {...contact, type: "primary"}
});

export const setPrimaryContact = (id: number | string) => ({
    type: types.SET_PRIMARY_CONTACT,
    payload: id
});

export const addOrUpdateContact = (contact: Contact) => ({
    type: types.ADD_OR_UPDATE_CONTACT,
    payload: contact
});

export const deleteContact = (id: number | string) => ({
    type: types.DELETE_CONTACT,
    payload: id
});

export const editUserName = (name) => ({
    type: types.SET_USER_NAME,
    payload: name
})

export const showOrderReview = (isShow) => ({
    type: types.SET_IS_ORDER_REVIEW_SHOW,
    payload: isShow
})

export const store_requested_variant_id = (variantId) =>({
    type:types.REQUESTED_VARIANT_ID,
    payload:variantId
})

export const remove_requested_variant_id =(variantId)=>({
    type:types.REMOVE_REQUESTED_VARIANT_ID,
    payload:variantId
})
