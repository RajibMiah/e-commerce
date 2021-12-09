import React, {useEffect, useState} from 'react'
import {
    CheckoutErrorBtnContainer, CheckoutErrorBtnWrapper,
    CheckoutErrorTitle,
    Container,
    ErrorPopupWrapper,
    RemovedTextContainer
} from "./checkout-two.style";
import {OrderTable, OrderTableWrapper} from "../../user-profile/order/order-details/order-details.style";
import {
    ItemWrapper,
} from "../../user-profile/order/order.style";
import {useCart} from "contexts/cart/use-cart";
import {Scrollbar} from "components/scrollbar/scrollbar";
import {
    Image,
    Information, ItemBox,
    Name,
} from "components/cart-item/cart-item.style";
import {Divider} from "@material-ui/core";
import Router from "next/router";
import {placeOrder} from "redux/order/action";
import {useDispatch, useSelector} from "react-redux";
import {AuthState} from "redux/auth/reducer";
import {ShippingState} from "redux/shipping/reducer";
import {OrderState} from "redux/order/reducer";
import {Counter} from "components/counter/counter";
import {NextPage} from "next";
import {variant} from "styled-system";

type RootState = {
    auth: AuthState;
    shipping: ShippingState;
    order: OrderState
}
type VariantProps = {
    id: string;
    max_allocation: string;
}

type PlaceOrderErrorProps = {
    onCloseBtnClick: () => void;
    errorMsg: {
        insufficient_stock_variants: VariantProps[]
    };
    setShowAlert: any;
}

type ItemProps = {
    id: string;
    title: string;
    max_allocation: string;
    thumbnail: string;
}

const validationString = {
    minimum_address_string_Length: 7
}
const PROPS_STATE = {
    MIN_LENGTH: 0,
    MIN_QTY: 0,
}
const PlaceOrderError: NextPage<PlaceOrderErrorProps> = ({onCloseBtnClick, errorMsg, setShowAlert}) => {
    const {
        items,
        clearCart,
        addItem,
        checkoutDetails,
        // removeItem,
        addCheckoutDetails,
        removeItemFromCart,
        cartItemsCount,
    } = useCart();
    const dispatch = useDispatch()
    const {access_token, addresses, contacts} = useSelector((state: RootState) => state.auth);
    const {timeslots} = useSelector((state: RootState) => state.shipping);
    const {comment} = useSelector((state: RootState) => state.order)
    const [checkoutItem, setCheckoutItem] = useState([])


    useEffect(() => {

        // NOTE:: filter  insufficient stock variant item
        let filteredItem = items.filter((item, index) => parseInt(errorMsg.insufficient_stock_variants.find((variant: VariantProps) => item.id === parseInt(variant.id))?.max_allocation) !== 0)

        // NOTE::find the max_allocation exception and replace with the insufficient stock variant qty
        let finalFilter = filteredItem.map((item, index) => {
            if (item.max_allocation > parseInt(errorMsg.insufficient_stock_variants.find((variant: VariantProps) => item.id === parseInt(variant.id))?.max_allocation)) {
                item.quantity = parseInt(errorMsg.insufficient_stock_variants.find((variant: VariantProps) => item.id === parseInt(variant.id))?.max_allocation)
                return item
            } else {
                return item
            }

        })
        setCheckoutItem(finalFilter)

    }, [errorMsg])

    // console.log('checkout items', checkoutItem)

    const incrementItem = (itemId) => {
        let newArray = checkoutItem.map((item) => {
            if (item.id === parseInt(itemId)) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            } else {
                return item
            }
        })
        setCheckoutItem(newArray)
    }

    const decrementItem = (itemId) => {
        let newArray = checkoutItem.map((item) => {
            if (item.id === parseInt(itemId) && item.quantity >= 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            } else {
                return item
            }
        })
        setCheckoutItem(newArray)
    }


    const handleProceed = () => {
        // console.log(checkoutItem)
        // checkoutItem.map((addedItem)=>{
        //     addItem(addedItem)
        // })

        if (checkoutItem.length > PROPS_STATE.MIN_LENGTH) {
            const address = addresses.find(value => {
                let withoutWhiteSpace = value.address && value.address.replace(/\s/g, "").length
                if (withoutWhiteSpace >= validationString.minimum_address_string_Length) {
                    return value.type === "primary"
                }
            });
            const contact = contacts.find(value => value.type === "primary");
            const timeslot = timeslots.find(item => item.type === "primary");
            const order = {
                billing_address: {...address, phone: contact.number},
                shipping_address: {...address, phone: contact.number},
                timeslot: timeslot.id,
                items: checkoutItem.map(item => {
                    return {
                        variant: item.id,
                        quantity: item.quantity
                    };
                }),
                comment: comment
            };
            const onSuccess = () => {
                Router.push("/order").then((e) => clearCart());
                onCloseBtnClick()
            };
            const onError = (error) => {
                console.log('ERROR ON PLACE ORDER', error)
                onCloseBtnClick()
            };
            dispatch(placeOrder(access_token, order, onSuccess, onError));
        } else {
            setShowAlert({
                isOpen: true,
                msg: 'All items are out of stock . Could not place an order.',
                type: 'error'
            })
            onCloseBtnClick()
        }
    }

    return (
        <Container>
            <ErrorPopupWrapper>
                <CheckoutErrorTitle>
                    <span>We are sorry. The following items  are already out of stock.</span>
                </CheckoutErrorTitle>
                <Divider/>
                <Scrollbar className='cart-scrollbar' style={{width: "100%"}}>
                    <ItemWrapper className='items-wrapper' style={{width: "100%", flexDirection: 'column'}}>
                        {
                            errorMsg.insufficient_stock_variants.map((item: ItemProps, index) => {
                                return (
                                    <ItemBox style={{width: 'inherit'}} key={index}>
                                        <Image
                                            src={item.thumbnail || "/no-image-available.webp"}
                                            alt={'product-image'}
                                        />
                                        <Information style={{width: "55%"}}>
                                            <Name>{item.title}</Name>
                                        </Information>
                                        {
                                            (parseInt(item.max_allocation) > PROPS_STATE.MIN_QTY) ?
                                                checkoutItem?.map((ckItem , index) => {
                                                    if (ckItem.id === parseInt(item.id)) {
                                                        return (
                                                            <RemovedTextContainer key={index}>
                                                                <Counter
                                                                    value={ckItem.quantity}
                                                                    max_allocation={parseInt(item.max_allocation)}
                                                                    onDecrement={() => decrementItem(ckItem.id)}
                                                                    onIncrement={() => incrementItem(ckItem.id)}
                                                                    variant="lightVertical"
                                                                />
                                                            </RemovedTextContainer>
                                                        )
                                                    }
                                                })

                                                :
                                                <span className={'removed-tag'}>Removed</span>
                                        }
                                        <Divider/>
                                    </ItemBox>

                                )
                            })
                        }
                    </ItemWrapper>
                </Scrollbar>
                <CheckoutErrorBtnContainer>
                    {/*<CheckoutErrorBtnWrapper*/}
                    {/*    className='back-btn'*/}
                    {/*    onClick={() => onCloseBtnClick()}*/}
                    {/*>*/}
                    {/*    Back*/}
                    {/*</CheckoutErrorBtnWrapper>*/}
                    <CheckoutErrorBtnWrapper
                        onClick={handleProceed}
                    >
                        Proceed
                    </CheckoutErrorBtnWrapper>
                </CheckoutErrorBtnContainer>
            </ErrorPopupWrapper>
        </Container>
    )
}
export default PlaceOrderError