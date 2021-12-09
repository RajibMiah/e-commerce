import * as types from "./types";

export const placeOrder = (access_token, order, onSuccess?, onError?) => async dispatch => {
    const url = `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/v1/orders/`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${access_token}`,
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        const data = await response.json();
        onError?.(data);
        return;
    }

    onSuccess?.();
};

export const placeOrderNotes = (notes:string)=>({
    type: types.PLACE_ORDER_NOTES,
    payload:notes
})

export const addNewOrderItems = (orderItem)=>({
    type:types.ADD_NEW_ORDER_ITEMS,
    payload: orderItem
})

export const  removeOrderItem = (item)=>({
    type:types.REMOVE_NEW_ORDER_ITEM,
    payload:item
})