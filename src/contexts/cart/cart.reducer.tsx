// export const cartItemsTotalPrice = (items, { discountInPercent = 0 } = {}) => {
export const cartItemsTotalPrice = (items, coupon = null) => {
    if (items === null || items.length === 0) return 0;
    const itemCost = items.reduce((total, item) => {
        if (item.sale_price) {
            return total + item.sale_price * item.quantity;
        }
        return total + item.original_price * item.quantity;
    }, 0);
    // const discountRate = 1 - discountInPercent;
    const discount = coupon
        ? (itemCost * Number(coupon.discount)) / 100
        : 0;
    // itemCost * discountRate * TAX_RATE + shipping;
    // return itemCost * discountRate;
    return itemCost - discount;
};

// cartItems, cartItemToAdd
const addItemToCart = (state, action) => {
    const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
    );

    if (existingCartItemIndex > -1) {
        const newState = [...state.items];
        newState[existingCartItemIndex].quantity += action.payload.quantity;
        return newState;
    }
    return [...state.items, action.payload];
};

const addNewItemToCart = (state, action) => {
    const existingCartItemIndex = state.addItems.findIndex(
        (item) => item.id === action.payload.id
    );

    if (existingCartItemIndex > -1) {
        const newState = [...state.addItems];
        newState[existingCartItemIndex].quantity += action.payload.quantity;
        return newState;
    }
    return [...state.addItems, action.payload];
};

//Note:: increment the quantity value to the items of the existing order

const incrementQuantityVolume = (state, action) => {

    const result = state.addQuantities.find((item) => item.id === action.payload?.itemId && item)

    //NOTE:: IF THE INPUT FIELD VALUE IS ZERO ,CONVERT IT TO 1 . ITEM WITH 0 QUANTITY WILL REMOVE ITEMS FROM THE SOURCE OBJECT.
    if (!action.payload.value) action.payload.value = 1

    if (result && (result?.variant?.max_allocation + result.quantity) > action.payload.value) {
        result.isStockOut = false
        result.quantity = action.payload.value
        return state.addQuantities.map((item) => {
            if (item.id === result.id) {
                return result
            } else {
                return item;
            }
        })
    } else {
        result.isStockOut = true
        return state.addQuantities.map((item) => {
            if (item.id === result.id) {
                result.quantity = item.variant.max_allocation
                return result
            } else {
                return item;
            }
        })
    }
}

const incrementQuantity = (state, action) => {

    const result = state.addQuantities.find((item) => item.id === action.payload.itemId && item)


    if (result && action.payload.maxAllocation - 1 > result?.quantity ) {
        result.isStockOut = false
        result.quantity += 1
        return state.addQuantities.map((item) => {
            if (item.id === result.id) {
                return result
            } else {
                return item;
            }
        })
    } else {
        result.isStockOut = true
        return state.addQuantities.map((item) => {
            if (item.id === result.id) {
                return result
            } else {
                return item;
            }
        })
    }
}

const decrementQuantity = (state, action) => {
    const result = state.addQuantities.find((item) => item.id === action.payload && item)


    if (result && result.quantity >= 2) {
        result.isStockOut = false;
        result.quantity -= 1;
        return state.addQuantities.map((item) => {
            if (item.id === result.id) {
                return result
            } else {
                return item;
            }
        })
    } else {
        return [...state.addQuantities]
    }

}


// cartItems, cartItemToRemove
const removeItemFromCart = (state, action) => {
    return state.items.reduce((acc, item) => {
        if (item.id === action.payload.id) {
            const newQuantity = item.quantity - action.payload.quantity;

            return newQuantity > 0
                ? [...acc, {...item, quantity: newQuantity}]
                : [...acc];
        }
        return [...acc, item];
    }, []);
};

const removeNewItemFromCart = (state, action) => {
    return state.addItems.reduce((acc, item) => {
        if (item.id === action.payload.id) {
            const newQuantity = item.quantity - action.payload.quantity;
            return newQuantity > 0
                ? [...acc, {...item, quantity: newQuantity}]
                : [...acc];
        }
        return [...acc, item];
    }, []);
};

const clearItemFromCart = (state, action) => {
    return state.items.filter((item) => item.id !== action.payload.id);
};

const clearNewAddedItem = (state, action) => {
    return state.addItems.filter((item) => item.orderId !== action.payload.orderId)
}


export const reducer = (state, action) => {
    //console.log('reducer called', state, action)
    switch (action.type) {
        case 'REHYDRATE':
            return {...state, ...action.payload};
        case 'TOGGLE_CART':
            return {...state, isOpen: !state.isOpen};
        case 'ADD_ITEM':
            return {...state, items: addItemToCart(state, action)};
        case 'ADD_NEW_ITEM':
            return {...state, addItems: addNewItemToCart(state, action)};
        case 'VALIDATED_ITEMS':
            return {...state, items: action.payload}
        case 'STORE_ORDER_ITEM':
            return {...state, items: action.payload};
        case 'ADD_CHECKOUT_DETAILS':
            delete action.payload.items
            return {...state, checkoutDetails: action.payload}
        case 'REMOVE_ITEM':
            return {...state, items: removeItemFromCart(state, action)};
        case 'REMOVE_NEW_ITEM':
            return {...state, addItems: removeNewItemFromCart(state, action)};
        case 'SET_QUANTITY':
            return {...state, addQuantities: action.payload}
        case 'INCREMENT_QTY_VOLUME':
            return {...state, addQuantities: incrementQuantityVolume(state, action)}
        case 'INCREMENT_QTY':
            return {...state, addQuantities: incrementQuantity(state, action)}
        case 'DECREMENT_QTY':
            return {...state, addQuantities: decrementQuantity(state, action)}
        case 'CLEAR_ITEM_FROM_CART':
            return {...state, items: clearItemFromCart(state, action)};
        case 'CLEAR_CART':
            return {...state, items: []};
        case 'CLEAR_NEW_CART':
            return {...state, addItems: clearNewAddedItem(state, action)};
        case 'APPLY_COUPON':
            return {...state, coupon: action.payload};
        case 'REMOVE_COUPON':
            return {...state, coupon: null};
        case 'TOGGLE_RESTAURANT':
            return {...state, isRestaurant: !state.isRestaurant};
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};
