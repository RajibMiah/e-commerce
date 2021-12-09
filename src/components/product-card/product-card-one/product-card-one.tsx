import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import Image from 'components/image/image';
import {Button} from 'components/button/button';
import {
    ProductCardWrapper,
    ProductImageWrapper,
    ProductInfo,
    DiscountPercent,
    ButtonText,
} from '../product-card.style';
import {useCart} from 'contexts/cart/use-cart';
import {Counter} from 'components/counter/counter';
import {cartAnimation} from 'utils/cart-animation';
import {FormattedMessage} from 'react-intl';
import {CartIcon} from 'assets/icons/CartIcon';
import firebase from "utils/firebase/firebase-config";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {AuthState} from "redux/auth/reducer";
import {STATIC_NUMBER} from "features/user-profile/order/order-details/order-details";
import {remove_requested_variant_id, store_requested_variant_id} from "redux/auth/action";
import {handleJoin} from "../../../utils/sign-in";

const QuickViewMobile = dynamic(() =>
    import('features/quick-view/quick-view-mobile')
);
type ProductCardProps = {
    title: string;
    image: any;
    weight: string;
    currency: string;
    description: string;
    price: number;
    salePrice?: number;
    discountInPercent?: number;
    data: any;
    max_allocation: number;
    onChange?: (e: any) => void;
    increment?: (e: any) => void;
    decrement?: (e: any) => void;
    cartProducts?: any;
    addToCart?: any;
    updateCart?: any;
    value?: any;
    deviceType?: any;
};

export  type RootState = {
    auth: AuthState;
}

type StaticProps = {
    MINIMUM_MAX_ALLOCATION: number,
    MINIMUM_DISCOUNT_PERCENTAGE:number,
}

const STATIC_PROPS: StaticProps = {
    MINIMUM_MAX_ALLOCATION: 0,
    MINIMUM_DISCOUNT_PERCENTAGE: 0
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     title,
                                                     image,
                                                     weight,
                                                     price,
                                                     salePrice,
                                                     discountInPercent,
                                                     cartProducts,
                                                     max_allocation,
                                                     addToCart,
                                                     updateCart,
                                                     value,
                                                     currency,
                                                     onChange,
                                                     increment,
                                                     decrement,
                                                     data,
                                                     deviceType,
                                                     ...props
                                                 }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const {addItem, removeItem, getItem, isInCart, items} = useCart();
    const {isAuthenticated, access_token, requested_variant_id} = useSelector((state: RootState) => state.auth);
    const [showAlert, setShowAlert] = useState({isOpen: true, msg: " ", type: ""});
    React.useEffect(() => {
        firebase.analytics().logEvent(`${data.title}_visited`);
    }, [])

    useEffect(() => {
        if (max_allocation > STATIC_PROPS.MINIMUM_MAX_ALLOCATION && requested_variant_id?.some((requested_id) => data?.id === requested_id)) {
            dispatch(remove_requested_variant_id(data?.id))
        }
    }, [max_allocation])

    const handleAddClick = (e) => {
        e.stopPropagation();
        addItem(data);
        if (!isInCart(data.id)) {
            cartAnimation(e);
        }
    };
    ``
    const handleRemoveClick = (e) => {
        e.stopPropagation();
        removeItem(data);

    };
    const discountCalculator = () => {
        let discountInCurrency = parseInt(data.original_price) - parseInt(data.sale_price)
        if (discountInCurrency > data.discount) {
            return <DiscountPercent> {currency}{discountInCurrency} OFF</DiscountPercent>

        } else {
            return <DiscountPercent>{discountInPercent}% OFF</DiscountPercent>
        }

    }

    const handleRequestStock = async (variantId) => {

        // NOTE::VALIDATE USER AUTHENTICATION
        //  if (!isAuthenticated) return handleJoin()

        if (requested_variant_id?.some((requested_id) => data.id === requested_id)) return
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/inventory/v1/stock-request/new/`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Token ${access_token}`,
                },
                method: 'POST',
                body: JSON.stringify({"variant": variantId})
            })
            if (response.ok) {
                const res = await response.json()
                setShowAlert({
                    isOpen: true,
                    msg: res.message,
                    type: 'success'
                })
                dispatch(store_requested_variant_id(variantId))
                // dispatch(alert_message({showAlert, setShowAlert }))
            }
        } catch (error) {
            setShowAlert({
                isOpen: true,
                msg: error.msg,
                type: 'error'
            })
        }
    }

    return (
        <ProductCardWrapper className="product-card">
            <Link
                href={`/product/${data.id}`}
            >
                <a>
                    <ProductImageWrapper>
                        <Image
                            url={image}
                            className="product-image"
                            style={{position: 'relative'}}
                            alt={title}
                        />
                        {discountInPercent ? discountCalculator() : null}
                    </ProductImageWrapper>
                </a>
            </Link>
            <ProductInfo>
                <Link
                    href={`/product/${data.id}`}
                >
                    <a>
                        <h3 className="product-title">{title}</h3>
                        <span className="product-weight">{weight}</span>
                    </a>
                </Link>
                <div className="product-meta">
                    <Link
                        href={`/product/${data.id}`}
                    >
                        <a style={{width: "100%"}}>
                            <div className="productPriceWrapper">
                                {discountInPercent > STATIC_PROPS.MINIMUM_DISCOUNT_PERCENTAGE && <span className="discountedPrice">{currency}{price}</span>}
                                <span className="product-price">{currency}{salePrice ? salePrice : price}</span>
                            </div>
                        </a>
                    </Link>
                    {
                        (max_allocation > STATIC_PROPS.MINIMUM_MAX_ALLOCATION && !((getItem(data.id)?.quantity) === max_allocation)) ?
                            !isInCart(data.id) ? (
                                <Button
                                    type='button'
                                    className="cart-button"
                                    variant="secondary"
                                    borderRadius={100}
                                    onClick={handleAddClick}
                                >
                                    <CartIcon mr={2}/>
                                    <ButtonText className={'add-to-cart'}>
                                        <FormattedMessage
                                            id="addCartButton"
                                            defaultMessage="Cart"

                                        />
                                    </ButtonText>
                                </Button>
                            ) : (
                                <Counter
                                    className={'cart-counter-btn'}
                                    max_allocation={max_allocation}
                                    value={getItem(data.id).quantity}
                                    onDecrement={handleRemoveClick}
                                    onIncrement={handleAddClick}
                                />
                            )
                            :
                            data.max_allocation >= STATIC_NUMBER.LIMIT_LENGTH ?
                                <Button
                                    type='button'
                                    className="out-of-stock-button"
                                    // onClick={() => handleRequestStock(data?.id)}
                                >
                                    <ButtonText style={{fontSize: '0.7rem'}}>
                                        Out of stock
                                    </ButtonText>
                                </Button>
                                :
                                <Button
                                    type='button'
                                    className="out-of-stock-button"
                                    onClick={() => handleRequestStock(data?.id)}
                                >
                                    <ButtonText style={{fontSize: '0.7rem'}}>
                                        {}
                                        {requested_variant_id?.some((requested_id) => data.id === requested_id) ? "Stock requested" : "Request stock"}
                                    </ButtonText>
                                </Button>
                    }
                </div>
            </ProductInfo>
        </ProductCardWrapper>
    );
};

// @ts-ignore
export default ProductCard