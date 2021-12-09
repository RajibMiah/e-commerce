import * as types from "./types";
import { AnyAction } from "redux";
import {act} from "react-dom/test-utils";
import {REMOVE_NEW_ORDER_ITEM} from "./types";

export interface NewItems{
    id:number;
    product:number;
    title:string;
    images:[];
    quantity:number
}


export type OrderState = {
    comment:string;
    newItems:[];
}

const INITIAL_STATE: OrderState = {
    comment:'',
    newItems:[],
};

const addItemToCart =  (state, action) => {
    const existingCartItemIndex = state.newItems.findIndex(
        (item) => item.id === action.payload.id
    );

    if (existingCartItemIndex > -1) {
        const newState = [...state.items];
        newState[existingCartItemIndex].quantity += action.payload.quantity;
        return newState;
    }
    return [...state.newItems, action.payload];
};

const removeItemFromCart = (state, action) => {
    return state.items.reduce((acc, item) => {
        if (item.id === action.payload.id) {
            const newQuantity = item.quantity - action.payload.quantity;

            return newQuantity > 0
                ? [...acc, { ...item, quantity: newQuantity }]
                : [...acc];
        }
        return [...acc, item];
    }, []);
};

const orderReducer = (state: OrderState = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case types.PLACE_ORDER: {
            return {
                ...state,
            };
        }
        case types.PLACE_ORDER_NOTES:{
            return{
                ...state,
                comment:action.payload
            }
        }
        case types.ADD_NEW_ORDER_ITEMS:{
            return{
                ...state,
                newItems : addItemToCart(state, action)
            }
        }
        case types.REMOVE_NEW_ORDER_ITEM:{
            return{
                ...state,
                newItems: removeItemFromCart(state, action)
            }
        }

        default:
            return state;
    }
};

export default orderReducer;