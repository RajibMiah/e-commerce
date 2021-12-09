import React, { useMemo, useState} from 'react'
import {
    CheckoutCartSlidePopup, CloseButton,
    ItemWrapper,
    PriceContainer
} from "./cart.style";
import {CURRENCY} from "utils/constant";
import {Scrollbar} from "components/scrollbar/scrollbar";
import {CartItem} from "components/cart-item/cart-item";
import {NoProductImg, NoProductMsg} from "../checkouts/checkout-two/checkout-two.style";
import {NoCartBag} from "assets/icons/NoCartBag";
import {FormattedMessage} from "react-intl";
import {useCart} from "contexts/cart/use-cart";
import { Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import useAppConstants from "data/use-app-constants";
import {
    CheckoutCostCalculation,
    DiscountPrice,
    Price,
    PriceRow
} from "../user-profile/order/order-details/order-details.style";
import MuiAlertBox from "components/meterial-ui/alert-message/MuiAlert";

type CartProps = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    isMobile: boolean;
};
type RootState = {
    auth: any
    constants: any
}


const CheckoutCarts: React.FC<CartProps> = ({isMobile}) => {
    const {access_token} = useSelector((state: RootState) => state.auth);
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: " ", type: ""});
    const {
        items,
        addItem,
        checkoutDetails,
        removeItem,
        addCheckoutDetails,
        removeItemFromCart,
        cartItemsCount,
    } = useCart();
    const {error: constantsError, constants} = useAppConstants()


    window !== undefined && useMemo(async () => {
        const newItemArray = items.map((item) => {
            return {
                variant: item.id,
                quantity: item.quantity
            }
        })
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/v1/checkout/`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Token ${access_token}`,
                },
                method: 'POST',
                body: JSON.stringify({items: newItemArray})
            })
            if (response.ok) {
                const data = await response.json()
                addCheckoutDetails(data)
            }
        } catch (error) {
            setShowAlert({
                isOpen: true,
                msg: error,
                type: 'error'
            })
        }
    }, [items]).then()

    return (
        <>
            <CheckoutCartSlidePopup className="cartPopupFixed">
                <Scrollbar className='cart-scrollbar'>
                    <ItemWrapper className='items-wrapper'>
                        {!!cartItemsCount ? (
                            items.map((item) => (
                                <CartItem
                                    key={`cartItem-${item.id}`}
                                    onIncrement={() => addItem(item)}
                                    onDecrement={() => removeItem(item)}
                                    onRemove={() => removeItemFromCart(item)}
                                    data={item}
                                />
                            ))
                        ) : (
                            <>
                                <NoProductImg>
                                    <NoCartBag/>
                                </NoProductImg>
                                <NoProductMsg>
                                    <FormattedMessage
                                        id='noProductFound'
                                        defaultMessage='No products found'
                                    />
                                </NoProductMsg>
                            </>
                        )}
                    </ItemWrapper>
                </Scrollbar>
                <PriceContainer>

                    <CheckoutCostCalculation>
                        <PriceRow>
                            <FormattedMessage id="subTotal" defaultMessage="Sub total"/>
                            <Price>{CURRENCY}{checkoutDetails?.total_gross_amount}</Price>
                        </PriceRow>

                        <PriceRow>
                            <FormattedMessage
                                id="intlOrderDetailsDelivery"
                                defaultMessage="Delivery Fee"
                            />
                            <Price>
                                {
                                    checkoutDetails?.is_delivery_free ?
                                        <span>
                                        Free
                                        <s style={{color: '#ff5b60', paddingLeft: "3px"}}>
                                            ( {CURRENCY}{checkoutDetails?.delivery_charge})
                                        </s>
                                    </span>
                                        :
                                        <span>
                                         {CURRENCY}{checkoutDetails?.delivery_charge}
                                    </span>
                                }
                            </Price>
                        </PriceRow>
                        <PriceRow>
                            <FormattedMessage
                                id="intlOrderDetailsDiscount"
                                defaultMessage="Discount"
                            />
                            <DiscountPrice> - {CURRENCY}{checkoutDetails?.discount}</DiscountPrice>
                        </PriceRow>

                        <PriceRow>
                            <FormattedMessage
                                id="intlCheckoutWallet"
                                defaultMessage="Added from wallet"
                            />
                            <DiscountPrice> - {CURRENCY}{checkoutDetails?.wallet_amount_used}</DiscountPrice>
                        </PriceRow>

                    </CheckoutCostCalculation>

                    <Typography
                        variant='body1'
                        color="primary"
                        style={{
                            fontWeight: "bold",
                            textAlign: 'center',
                            padding: '21px'
                        }}
                    >
                        Total Price {CURRENCY}{checkoutDetails?.total_net_amount}
                    </Typography>
                </PriceContainer>
            </CheckoutCartSlidePopup>
            <MuiAlertBox
                showAlert={showAlert}
                setOpen={setShowAlert}
            />
        </>
    )
}

export default CheckoutCarts
