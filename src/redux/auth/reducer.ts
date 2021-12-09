import * as types from "./types";
import {AnyAction} from "redux";
import {Req_variant_id, User} from "types/user";
import {Address} from "types/address";
import {v4 as uuidV4} from "uuid";
import {Contact} from "types/contact";
import {act} from "react-dom/test-utils";

const isBrowser = typeof window !== "undefined";


export type AuthState = {
    isAuthenticated: boolean;
    currentForm: string;
    access_token: string | null;
    user: User | null;
    addresses: Address[];
    contacts: Contact[];
    isUserUsedReferralCode: boolean;
    isShowOrderReview: boolean;
    requested_variant_id: [],
    referralInfo: {
        general_info: any
        total_referee: number
    }
}

const INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    isUserUsedReferralCode: false,
    isShowOrderReview: false,
    currentForm: "signIn",
    access_token: null,
    user: null,
    requested_variant_id: [],
    addresses: [],
    contacts: [],
    referralInfo: {
        general_info: null,
        total_referee: 0
    },

};
const addRequestVariant = (state, action) => {
    console.log('add request function' , action.payload)
    const newArray = [...state.requested_variant_id]
    newArray.push(action.payload)
    return newArray
}

const removeRequestedVariant = (state, action) => {
    return state.requested_variant_id.filter((id) => id !== action.payload)
}

const authReducer = (state: AuthState = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case types.SIGN_IN: {
            return {
                ...state,
                currentForm: "signIn",
            };
        }
        case types.SIGN_IN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                access_token: action.payload
            };
        }
        case types.SIGN_OUT: {
            return {
                ...state,
                isAuthenticated: false,
                access_token: null,
                user: null,
                addresses: [],
                contacts: []
            };
        }

        case types.SIGN_UP: {
            return {
                ...state,
                currentForm: "signUp",
            };
        }
        case types.FORGOT_PASSWORD: {
            return {
                ...state,
                currentForm: "forgotPass",
            };
        }
        case types.REQUESTED_VARIANT_ID: {
            console.log('action' , action.payload)
            return {
                ...state,
                requested_variant_id: addRequestVariant(state, action)
            }
        }

        case types.REMOVE_REQUESTED_VARIANT_ID: {
            return {
                ...state,
                requested_variant_id: removeRequestedVariant(state, action)
            }
        }

        case types.IS_USER_USED_REFERRAL_CODE: {
            return {
                ...state,
                isUserUsedReferralCode: true
            }
        }
        case types.PROFILE_FETCH_SUCCESS: {
            return {
                ...state,
                user: action.payload
            };
        }
        case types.ADD_REFERRAL_INFO: {
            const {general_info, total_referee} = action.payload
            return {
                ...state,
                referralInfo: {
                    general_info,
                    total_referee
                }
            }
        }
        case types.UPDATE_CURRENT_REFEREE: {
            return {
                ...state,
                referralInfo: {
                    ...state.referralInfo,
                    total_referee: action.payload
                }


            }
        }
        case types.ADD_OR_UPDATE_ADDRESS: {
            let isExisting = false;
            const _addresses = state.addresses.map((item: Address) => {
                if (item.id === action.payload.id) {
                    isExisting = true;
                    return {
                        ...item,
                        ...action.payload
                    };
                } else {
                    return item;
                }
            });

            if (!isExisting) {
                const newAddress = {
                    ...action.payload,
                    id: action.payload.id || uuidV4(),
                    type: state.addresses.length === 0 ? "primary" : "secondary"
                };
                _addresses.push(newAddress);
            }
            ``
            return {
                ...state,
                addresses: _addresses
            };
        }
        case types.SET_PRIMARY_ADDRESS: {
            return {
                ...state,
                addresses: state.addresses.map((item: Address) =>
                    item.id.toString() === action.payload.toString()
                        ? {...item, type: "primary"}
                        : {...item, type: "secondary"}
                ),
            };
        }
        case types.DELETE_ADDRESS: {
            return {
                ...state,
                addresses: state.addresses.filter(
                    /**
                     * NOTE:
                     *
                     * If the address is created in the client side, it'll have a uuid4 id,
                     * which is typeof string. That's why we need to cast the id to string before comparing.
                     */
                    (item: Address) => item.id.toString() !== action.payload.toString()
                )
            };
        }

        case types.ADD_OR_UPDATE_CONTACT: {
            let isExisting = false;
            const _contacts = state.contacts.map((item: Contact) => {
                if (item.id === action.payload.id) {
                    isExisting = true;
                    return {
                        ...item,
                        ...action.payload
                    };
                } else {
                    return item;
                }
            });

            if (!isExisting) {
                const newContact = {
                    ...action.payload,
                    id: action.payload.id || uuidV4(),
                    type: state.contacts.length === 0 ? "primary" : "secondary"
                };
                _contacts.push(newContact);
            }

            return {
                ...state,
                contacts: _contacts
            };
        }
        case types.SET_PRIMARY_CONTACT: {
            return {
                ...state,
                contacts: state.contacts.map((item: Contact) =>
                    item.id.toString() === action.payload.toString()
                        ? {...item, type: "primary"}
                        : {...item, type: "secondary"}
                ),
            };
        }
        case types.DELETE_CONTACT: {
            return {
                ...state,
                contacts: state.contacts.filter(
                    (item: Contact) => item.id !== action.payload
                )
            };
        }
        case types.SET_USER_NAME: {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        }
        case types.SET_IS_ORDER_REVIEW_SHOW: {
            return {
                ...state,
                isShowOrderReview: action.payload
            }

        }
        default:
            return state;
    }
};

export default authReducer;