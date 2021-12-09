import React, {useEffect, useState} from 'react';
import {
    CartPopupBody,
    PopupHeader,
    PopupItemCount,
    CloseButton,
    PromoCode,
    CheckoutButtonWrapper,
    CheckoutButton,
    Title,
    PriceBox,
    NoProductMsg,
    NoProductImg,
    ItemWrapper,
    CouponBoxWrapper,
    CouponCode,
    OfferContainer, MuiTypo
} from './cart.style';
import {CloseIcon} from 'assets/icons/CloseIcon';
import {ShoppingBagLarge} from 'assets/icons/ShoppingBagLarge';
import {NoCartBag} from 'assets/icons/NoCartBag';
import {CURRENCY} from 'utils/constant';
import {FormattedMessage} from 'react-intl';
import {useLocale} from 'contexts/language/language.provider';
import {openModal} from "@redq/reuse-modal";
import {Scrollbar} from 'components/scrollbar/scrollbar';
import {useCart} from 'contexts/cart/use-cart';
import {CartItem} from 'components/cart-item/cart-item';
import Coupon from 'features/coupon/coupon';
import {Box, Typography} from "@material-ui/core";
import {useMedia} from "../../utils/use-media";
import {useDispatch, useSelector} from "react-redux";
import constants from "../../redux/constants/reducer";
import useAppConstants from "../../data/use-app-constants";
import Router from "next/router";
import MuiAlertBox from "../../components/meterial-ui/alert-message/MuiAlert";
import {ShippingState} from "../../redux/shipping/reducer";
import {toggleSignInForm} from "../../redux/auth/action";
import AuthenticationForm from "../authentication-form";

type CartPropsType = {
    style?: any;
    className?: string;
    scrollbarHeight?: string;
    onCloseBtnClick?: (e: any) => void;
};

type RootState = {
    constants: {
        data: any
    }
    auth: any
}
const Cart: React.FC<CartPropsType> = ({
                                           style,
                                           className,
                                           onCloseBtnClick,
                                           scrollbarHeight,
                                       }) => {
    const {
        items,
        coupon,
        addItem,
        addValidatedItem,
        removeItem,
        addCheckoutDetails,
        removeItemFromCart,
        cartItemsCount,
        calculatePrice,
    } = useCart();
    const {error: constantsError, constants} = useAppConstants()
    const {free_delivery_limit, delivery_charge} = constants
    const {access_token} = useSelector((state: RootState) => state.auth);
    const [hasCoupon, setCoupon] = useState(false);
    const desktop = useMedia("(min-width: 992px)");
    const {isRtl} = useLocale();
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: " ", type: ""});

    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state: RootState) => state.auth);


    const handleJoin = () => {
        dispatch(toggleSignInForm());

        openModal({
            show: true,
            overlayClassName: "quick-view-overlay",
            closeOnClickOutside: true,
            component: AuthenticationForm,
            closeComponent: "",
            config: {
                enableResizing: false,
                disableDragging: true,
                className: "quick-view-modal",
                width: 458,
                height: "auto",
                animationFrom: {opacity: "0"},
                animationTo: {opacity: "1"},
                transition: {
                    delay: 500,
                },
                withRnd: false,
            },
        });
    };

    const handlePostCart = async (items) => {
        Router.push('/checkout').then()
        // const newItemArray = items.map((item) => {
        //     return {
        //         variant: item.id,
        //         quantity: item.quantity
        //     }
        // })
        // if (!isAuthenticated) handleJoin();
        // try {
        //     const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/v1/checkout/`, {
        //         headers: {
        //             "Content-type": "application/json",
        //             "Authorization": `Token ${access_token}`,
        //         },
        //         method: 'POST',
        //         body: JSON.stringify({items: newItemArray})
        //     })
        //     if (response.ok) {
        //         const data = await response.json()
        //         const validated_items = data.items.map((item, index) => {
        //             if (item.max_allocation < items[index].quantity) {
        //                 /**
        //                  * NOTE:: ITEM IS OUT OF STOCK IN SERVER SIDE VALIDATION
        //                  */
        //                 setShowAlert({
        //                     isOpen: true,
        //                     msg: `${item.title} is out of stock removed from cart`,
        //                     type: 'warning'
        //                 })
        //             } else {
        //                 // from its own property
        //                 item.original_price = item.unit_price_gross_amount
        //                 item.sale_price = item.unit_price_net_amount
        //                 //from cart items
        //                 item.id = items[index].id
        //                 item.measurement = items[index].measurement
        //                 item.measurement_unit = items[index].measurement_unit
        //                 item.measurement_value = items[index].measurement_value
        //                 return item
        //             }
        //         })
        //         addValidatedItem(validated_items)
        //         addCheckoutDetails(data)
        //         Router.push('/checkout').then()
        //     }
        // } catch (error) {
        //     setShowAlert({
        //         isOpen: true,
        //         msg: error,
        //         type: 'error'
        //     })
        // }
    }
    return (
        <CartPopupBody className={className} style={style}>
            <PopupHeader>
                <PopupItemCount>
                    <ShoppingBagLarge width='19px' height='24px'/>
                    <span>
                      {cartItemsCount}
                        &nbsp;
                        {cartItemsCount > 1 ? (
                            <FormattedMessage id='cartItems' defaultMessage='items'/>
                        ) : (
                            <FormattedMessage id='cartItem' defaultMessage='item'/>
                        )}
                   </span>
                </PopupItemCount>

                <CloseButton onClick={onCloseBtnClick}>
                    {
                        desktop && <Typography
                            variant='subtitle2'
                            style={{margin: "7px", color: '#868282'}}
                        >
                            Close
                        </Typography>
                    }

                    <CloseIcon style={{color: "#868282"}}/>
                </CloseButton>
            </PopupHeader>

        {/* <OfferContainer>
                <MuiTypo
                    variant='body2'
                    color='primary'
                >
                    {(calculatePrice() >= parseInt(free_delivery_limit)) ?
                        `You have just saved ${CURRENCY} ${parseInt(delivery_charge)} delivery charge`
                        :
                        `Shop more than ${CURRENCY} ${parseInt(free_delivery_limit)} and save ${CURRENCY} ${parseInt(delivery_charge)} delivery charge`
                    }
                </MuiTypo>
            </OfferContainer> */}

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

            <CheckoutButtonWrapper>
                <PromoCode>
                    {!coupon?.discountInPercent ? (
                        <>
                            {!hasCoupon ? (
                                <button onClick={() => setCoupon((prev) => !prev)}>
                                    <FormattedMessage
                                        id='specialCode'
                                        defaultMessage='Have a special code?'
                                    />
                                </button>
                            ) : (
                                <CouponBoxWrapper>
                                    <Coupon
                                        disabled={!items.length}
                                        style={{
                                            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.06)',
                                        }}
                                    />
                                </CouponBoxWrapper>
                            )}
                        </>
                    ) : (
                        <CouponCode>
                            <FormattedMessage
                                id='couponApplied'
                                defaultMessage='Coupon Applied'
                            />
                            <span>{coupon.code}</span>
                        </CouponCode>
                    )}
                </PromoCode>
                {cartItemsCount !== 0 ? (
                    <div onClick={() => handlePostCart(items)}>
                        <CheckoutButton onClick={onCloseBtnClick}>
                            <>
                                <Title>
                                    <FormattedMessage
                                        id='nav.checkout'
                                        defaultMessage='Checkout'
                                    />
                                </Title>
                                <PriceBox>
                                    {CURRENCY}
                                    {calculatePrice()}
                                </PriceBox>
                            </>
                        </CheckoutButton>
                    </div>
                ) : (
                    <CheckoutButton>
                        <>
                            <Title>
                                <FormattedMessage id='nav.checkout' defaultMessage='Checkout'/>
                            </Title>
                            <PriceBox>
                                {CURRENCY}
                                {calculatePrice()}
                            </PriceBox>
                        </>
                    </CheckoutButton>
                )}
            </CheckoutButtonWrapper>
            <MuiAlertBox
                showAlert={showAlert}
                setOpen={setShowAlert}
            />
        </CartPopupBody>
    );
};

export default Cart;
