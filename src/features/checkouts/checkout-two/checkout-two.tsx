import React, {useEffect, useState} from "react";
import Router from "next/router";
import Link from "next/link";
import {Button} from "components/button/button";
import {CURRENCY} from "utils/constant";
import {openModal, closeModal} from '@redq/reuse-modal';
import CheckoutCart from 'features/carts/checkout-carts';
import CheckoutWrapper, {
    CheckoutContainer,
    CheckoutInformation,
    CheckoutSubmit,
    DeliverySchedule,
    InformationBox,
    TermConditionLink,
    TermConditionText,
} from "./checkout-two.style";
import {themeGet} from '@styled-system/theme-get';
import {FormattedMessage} from "react-intl";
import {useCart} from "contexts/cart/use-cart";
import {useWindowSize} from "utils/useWindowSize";
import Schedules from "features/schedule/schedule";
import Contact from "features/contact/contact";
import Payment from "features/payment/payment";
import Address from "features/address/address";
import {AuthState as AuthState} from "redux/auth/reducer";
import {useDispatch, useSelector} from "react-redux";
import {placeOrder} from "redux/order/action";
import {ShippingState} from "redux/shipping/reducer";
import CartPopupButton from "components/cart-popup/cart-popup-button";
import {createGlobalStyle} from "styled-components";
import MuiAlert from "components/meterial-ui/alert-message/MuiAlert";
import AlertMessage from "components/alert-message/alert-message";
import {number} from "yup";
import UserNotes from "./user-notes";
import {OrderState} from "redux/order/reducer";
import PlaceOrderError from "./place-order-error";


// The type of props Checkout Form receives
interface MyFormProps {
    deviceType: any;
}

type CartItemProps = {
    product: any;
};

type RootState = {
    auth: AuthState;
    shipping: ShippingState;
    order:OrderState
}

const validationString = {
    minimum_address_string_Length: 7
}

const PROPS_STATE ={
    MIN_LENGTH : 0
}

const CartPopupStyle = createGlobalStyle`
  .cartPopup {
    top: auto !important;
    left: auto !important;
    bottom: 50px !important;
    right: 50px !important;
    box-shadow: ${themeGet('shadows.big', '0 21px 36px rgba(0, 0, 0, 0.16)')};
    transform-origin: bottom right;

    @media (max-width: 580px) {
      max-width: none !important;
      width: 100% !important;
      bottom: 0 !important;
      left: 0 !important;
      background: ${themeGet('colors.white', '#ffffff')};
      overflow: initial !important;
      transform-origin: bottom center;
    }
  }
`;


const CheckoutWithSidebar: React.FC<MyFormProps> = ({deviceType}) => {
    const dispatch = useDispatch();
    const {access_token, addresses, contacts} = useSelector((state: RootState) => state.auth);
    const {timeslots} = useSelector((state: RootState) => state.shipping);
    const {comment} = useSelector((state:RootState)=> state.order)
    const [defaultErrorMessage, setDefaultErrorMessage] = useState<any>({type: '', text: ' '})
    const [openError, setOpenError] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState({isOpen: false, type: '', msg: ''});

    const {
        items,
        clearCart,
        cartItemsCount,
        calculatePrice,
    } = useCart();
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isAddressFound, setIsAddressFound] = useState(false);
    const [isContactFound, setIsContactFound] = useState(false);
    const [isTimeslotFound, setIsTimeslotFound] = useState(false);
    const size = useWindowSize();

    const handleSubmit = async () => {
        if (isValid) {
            setLoading(true);
            setIsValid(false)
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
                items: items.map(item => {
                    return {
                        variant: item.id,
                        quantity: item.quantity
                    };
                }),
                comment:comment,
                is_tomorrow:timeslot.is_tomorrow
            };
            const onSuccess = () => {
                setLoading(false);
                Router.push("/order").then((e) => clearCart());
            };
            const onError = (error) => {
                setLoading(false)
                setIsValid(true)
                handleError(error)
            };
            dispatch(placeOrder(access_token, order, onSuccess, onError));
        }
    };

    const handleError =(error) =>{
        openModal({
            show: true,
            config: {
                className: 'cartPopup',
                width: "500px",
                height: 'auto',
                enableResizing: false,
                disableDragging: true,
                transition: {
                    tension: 360,
                    friction: 40,
                },
            },
            closeOnClickOutside: true,
            component: PlaceOrderError,
            closeComponent: () => <div/>,
            componentProps: {
                onCloseBtnClick: closeModal,
                scrollbarHeight: 330 ,
                setShowAlert:setShowAlert,
                errorMsg:error
            },
        });
    }

    const handleModal = () => {
        openModal({
            show: true,
            config: {
                className: 'cartPopup',
                width: 'auto',
                height: 'auto',
                enableResizing: false,
                disableDragging: true,
                transition: {
                    tension: 360,
                    friction: 40,
                },
            },
            closeOnClickOutside: true,
            component: CheckoutCart,
            closeComponent: () => <div/>,
            componentProps: {onCloseBtnClick: closeModal, scrollbarHeight: 330},
        });
    };

    useEffect(() => {
        if (!addresses || !addresses[0]?.address) {
            setDefaultErrorMessage({type: 'warning', text: 'Please fill in address field with a proper address'})
            setOpenError(true);
        } else {
            setOpenError(false)
        }
        setIsAddressFound(!!addresses.find(item => item.address && item.address.replace(/\s/g, "").length >= validationString.minimum_address_string_Length && item.type === 'primary'))
        setIsContactFound(!!contacts.find(item => item.type === "primary"));
        setIsTimeslotFound(!!timeslots.find(item => item.type === "primary"));

    }, [addresses, contacts, timeslots]);
    useEffect(() => {
        setIsValid(
            calculatePrice() > PROPS_STATE.MIN_LENGTH
            && cartItemsCount > PROPS_STATE.MIN_LENGTH
            && isAddressFound
            && isContactFound
            && isTimeslotFound
            && !!cartItemsCount
        );
    }, [isAddressFound, isContactFound, isTimeslotFound, cartItemsCount]);



    return (
        <>
            <CheckoutWrapper>
                <CheckoutContainer>

                    <CheckoutInformation>
                        {/* DeliveryAddress */}
                        <InformationBox error={isAddressFound} id='address_section'>
                            <Address
                                increment={true}
                                flexStart={true}
                                buttonProps={{
                                    variant: "text",
                                    type: "button",
                                    className: "addButton",
                                }}
                                icon={true}
                            />
                        </InformationBox>

                        {/* DeliverySchedule */}
                        <InformationBox error={isTimeslotFound} id='time_slot'>
                            <DeliverySchedule>
                                <Schedules increment={true}/>
                            </DeliverySchedule>
                        </InformationBox>

                        {/* Contact number */}
                        <InformationBox error={isContactFound} id='contact_section'>
                            <Contact
                                increment={true}
                                flexStart={true}
                                buttonProps={{
                                    variant: "text",
                                    type: "button",
                                    className: "addButton",
                                }}
                                icon={true}
                            />
                        </InformationBox>
                        <InformationBox error={true} >
                            <UserNotes/>
                        </InformationBox>

                        {/* PaymentOption */}
                        <InformationBox
                            className='paymentBox'
                            style={{paddingBottom: 30}}
                            error={true}
                        >
                            <Payment deviceType={deviceType} increment={true}/>

                            <TermConditionText>
                                <FormattedMessage
                                    id='termAndConditionHelper'
                                    defaultMessage='By making this purchase you agree to our'
                                />
                                <Link href='/terms'>
                                    <TermConditionLink>
                                        <FormattedMessage
                                            id='termAndCondition'
                                            defaultMessage='terms and conditions.'
                                        />
                                    </TermConditionLink>
                                </Link>
                            </TermConditionText>

                            {/* CheckoutSubmit */}
                            <CheckoutSubmit>
                                <Button
                                    id='place-order-button'
                                    type='button'
                                    onClick={handleSubmit}
                                    disabled={!isValid}
                                    size='big'
                                    loading={loading}
                                    style={{width: "100%"}}
                                >
                                    <FormattedMessage
                                        id='placeOrder'
                                        defaultMessage='Order Now'
                                    />
                                </Button>
                            </CheckoutSubmit>
                        </InformationBox>
                    </CheckoutInformation>
                    {
                        deviceType.mobile ?
                            <>
                                <CartPopupStyle/>
                                <CartPopupButton
                                    className='product-cart'
                                    itemCount={cartItemsCount}
                                    itemPostfix={
                                        cartItemsCount > 1 ? (
                                            <FormattedMessage id='cartItems' defaultMessage='items'/>
                                        ) : (
                                            <FormattedMessage id='cartItem' defaultMessage='item'/>
                                        )
                                    }
                                    price={calculatePrice()}
                                    pricePrefix={CURRENCY}
                                    onClick={handleModal}
                                />
                            </>
                            :
                            <CheckoutCart isMobile={deviceType.mobile}/>
                    }
                </CheckoutContainer>
            </CheckoutWrapper>
            <MuiAlert showAlert={showAlert} setOpen={setShowAlert}/>
            <AlertMessage message={defaultErrorMessage} open={openError} setOpen={setOpenError}/>
        </>
    );
};

export default CheckoutWithSidebar;