import React, {useReducer, useContext, createContext} from 'react';
import {reducer, cartItemsTotalPrice} from './cart.reducer';
import {useStorage} from 'utils/use-storage';

const CartContext = createContext({} as any);
const INITIAL_STATE = {
    isOpen: false,
    items: [],
    addItems: [],
    addQuantities: [],
    isRestaurant: false,
    coupon: null,
};

const useCartActions = (initialCart = INITIAL_STATE) => {
    const [state, dispatch] = useReducer(reducer, initialCart);

    const addItemHandler = (item, quantity = 1) => {
        dispatch({type: 'ADD_ITEM', payload: {...item, quantity}});
    };
    const addNewItemHandler = (item, orderId, quantity = 1) => {
        dispatch({type: 'ADD_NEW_ITEM', payload: {...item, orderId, quantity}});
    };
    const validated_items = (items) => {
        dispatch({type: 'VALIDATED_ITEMS', payload: items})
    }
    const addCheckoutDetails = (data) => {
        dispatch({type: 'ADD_CHECKOUT_DETAILS', payload: data})
    }
    const setQuantities = (data) => {
        dispatch({type: 'SET_QUANTITY', payload: data})
    }
    const inputQtyVolume = (itemId , value)=>{
        dispatch({type: 'INCREMENT_QTY_VOLUME', payload: {itemId , value}})
    }
    const incrementQuantity = (itemId , maxAllocation) => {
        dispatch({type: 'INCREMENT_QTY', payload: {itemId , maxAllocation}})
    }
    const decrementQuantity = (itemId) => {
        dispatch({type: 'DECREMENT_QTY', payload: itemId})
    }
    const reOrderHandler = (items) => {
        const cartItems = items.map((orderItem) => {
            return {...orderItem.variant, quantity: orderItem.quantity}
        })
        dispatch({type: 'STORE_ORDER_ITEM', payload: cartItems});
    };

    const removeItemHandler = (item, quantity = 1) => {
        dispatch({type: 'REMOVE_ITEM', payload: {...item, quantity}});
    };

    const removeNewItemHandler = (item, orderId, quantity = 1) => {
        dispatch({type: 'REMOVE_NEW_ITEM', payload: {...item, orderId, quantity}});
    };

    const clearItemFromCartHandler = (item) => {
        dispatch({type: 'CLEAR_ITEM_FROM_CART', payload: item});
    };
    const storeReOrder = (ORDER_ITEM) => {
        dispatch({type: 'STORE_ORDER_ITEM', payload: ORDER_ITEM});
    }

    const clearCartHandler = () => {
        dispatch({type: 'CLEAR_CART'});
    };

    const clearNewCartHandler = (orderId) => {
        dispatch({type: 'CLEAR_NEW_CART' ,payload:{orderId}});
    };
    const toggleCartHandler = () => {
        dispatch({type: 'TOGGLE_CART'});
    };
    const couponHandler = (coupon) => {
        dispatch({type: 'APPLY_COUPON', payload: coupon});
    };
    const removeCouponHandler = () => {
        dispatch({type: 'REMOVE_COUPON'});
    };
    const rehydrateLocalState = (payload) => {
        dispatch({type: 'REHYDRATE', payload});
    };
    const toggleRestaurant = () => {
        dispatch({type: 'TOGGLE_RESTAURANT'});
    };
    const isInCartHandler = (id) => {
        return state.items?.some((item) => item.id === id);
    };
    const isInNewCartHandler = (id) => {
        return state.addItems?.some((item) => item.id === id);
    };
    const getItemHandler = (id) => {
        return state.items?.find((item) => item.id === id);
    };
    const getNewItemHandler = (id) => {
        return state.addItems?.find((item) => item.id === id);
    };
    const getNewQtyItemPrice = (index) => {
        return state.addQuantities[index].variant.sale_price * state.addQuantities[index].quantity
    }
    const getCartItemsPrice = () => cartItemsTotalPrice(state.items).toFixed(2);
    const getCartItemsTotalPrice = () =>
        cartItemsTotalPrice(state.items, state.coupon).toFixed(2);

    const getDiscount = () => {
        const total = cartItemsTotalPrice(state.items);
        const discount = state.coupon
            ? (total * Number(state.coupon?.discountInPercent)) / 100
            : 0;
        return discount.toFixed(2);
    };
    const getItemsCount = state.items?.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    return {
        state,
        getItemsCount,
        rehydrateLocalState,
        addItemHandler,
        addNewItemHandler,
        setQuantities,
        inputQtyVolume,
        incrementQuantity,
        decrementQuantity,
        getNewQtyItemPrice,
        reOrderHandler,
        addCheckoutDetails,
        validated_items,
        removeItemHandler,
        removeNewItemHandler,
        clearItemFromCartHandler,
        clearCartHandler,
        clearNewCartHandler,
        isInCartHandler,
        isInNewCartHandler,
        getItemHandler,
        getNewItemHandler,
        toggleCartHandler,
        getCartItemsTotalPrice,
        getCartItemsPrice,
        couponHandler,
        removeCouponHandler,
        getDiscount,
        toggleRestaurant,
    };
};

export const CartProvider = ({children}) => {
    const {
        state,
        rehydrateLocalState,
        getItemsCount,
        addItemHandler,
        addNewItemHandler,
        validated_items,
        setQuantities,
        inputQtyVolume,
        incrementQuantity,
        decrementQuantity,
        getNewQtyItemPrice,
        reOrderHandler,
        removeItemHandler,
        removeNewItemHandler,
        addCheckoutDetails,
        clearItemFromCartHandler,
        clearCartHandler,
        clearNewCartHandler,
        isInCartHandler,
        isInNewCartHandler,
        getItemHandler,
        getNewItemHandler,
        toggleCartHandler,
        getCartItemsTotalPrice,
        couponHandler,
        removeCouponHandler,
        getCartItemsPrice,
        getDiscount,
        toggleRestaurant,
    } = useCartActions();

    const {rehydrated, error} = useStorage(state, rehydrateLocalState);

    return (
        <CartContext.Provider
            value={{
                isOpen: state.isOpen,
                items: state.items,
                Qty: state.addQuantities,
                newAddedItem: state.addItems,
                coupon: state.coupon,
                usedWalletAmount: state.usedWalletAmount,
                isRestaurant: state.isRestaurant,
                cartItemsCount: state.items?.length,
                totalDiscount: state.totalDiscount,
                itemsCount: getItemsCount,
                checkoutDetails: state.checkoutDetails,
                qtyItemPrice: getNewQtyItemPrice,
                addItem: addItemHandler,
                addNewItem: addNewItemHandler,
                addValidatedItem: validated_items,
                reOrder: reOrderHandler,
                removeItem: removeItemHandler,
                removeNewItem: removeNewItemHandler,
                addCheckoutDetails,
                setQuantities,
                inputQtyVolume,
                incrementQty: incrementQuantity,
                decrementQty: decrementQuantity,
                removeItemFromCart: clearItemFromCartHandler,
                clearCart: clearCartHandler,
                clearNewCart: clearNewCartHandler,
                isInCart: isInCartHandler,
                isInNewCart: isInNewCartHandler,
                getItem: getItemHandler,
                getNewItem: getNewItemHandler,
                toggleCart: toggleCartHandler,
                calculatePrice: getCartItemsTotalPrice,
                calculateSubTotalPrice: getCartItemsPrice,
                applyCoupon: couponHandler,
                removeCoupon: removeCouponHandler,
                calculateDiscount: getDiscount,
                toggleRestaurant,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
