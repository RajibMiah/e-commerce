import React, {useEffect, useMemo, useState} from 'react';
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
import MuiAlertBox from "../../meterial-ui/alert-message/MuiAlert";
import {FormattedMessage} from 'react-intl';
import {CartIcon} from 'assets/icons/CartIcon';
import firebase from "utils/firebase/firebase-config";
import {Typography} from "@material-ui/core";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {addNewOrderItems} from "../../../redux/order/action";
import {AuthState} from "redux/auth/reducer";
import {remove_requested_variant_id, store_requested_variant_id} from "redux/auth/action";
import {handleJoin} from "utils/sign-in";

const QuickViewMobile = dynamic(() =>
    import('features/quick-view/quick-view-mobile')
);

type ProductCardProps = {
    orderId:number;
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

export  type UserAuthState = {
    auth: AuthState;
}

const AddProductCard: React.FC<ProductCardProps> = ({
                                                        orderId,
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
    const {addNewItem, removeNewItem, getNewItem, isInNewCart, newAddedItem} = useCart();
    const {isAuthenticated, access_token, requested_variant_id} = useSelector((state: UserAuthState) => state.auth);
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: " ", type: ""});

    React.useEffect(() => {
        firebase.analytics().logEvent(`${data.title}_visited`);
    }, [])

    // useMemo(()=>{
    //     // console.log('data', data)
    //     console.log('new item' , newAddedItem)
    // },[data])

    const handleAddClick = (e) => {
        e.stopPropagation();
        addNewItem(data, orderId)
    };
    const handleRemoveClick = (e) => {
        removeNewItem(data ,orderId);

    };
    const handleRequestStock = async (variantId) => {

        if (!isAuthenticated) return handleJoin()

        // @ts-ignore
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
                dispatch(store_requested_variant_id(variantId))
                // setShowAlert({
                //     isOpen: true,
                //     msg: res.message,
                //     type: 'success'
                // })
                // dispatch(alert_message({showAlert, setShowAlert }))
            }
        } catch (error) {
            // setShowAlert({
            //     isOpen: true,
            //     msg: error.msg,
            //     type: 'error'
            // })
        }
    }
    const discountCalculator = () => {
        let discountInCurrency = parseInt(data.original_price) - parseInt(data.sale_price)
        if (discountInCurrency > data.discount) {
            return <DiscountPercent> {currency}{discountInCurrency} OFF</DiscountPercent>

        } else {
            return <DiscountPercent>{discountInPercent}% OFF</DiscountPercent>
        }
    }

    return (
        <ProductCardWrapper className="product-card">
            {/*<Link*/}
            {/*    href={`/product/${data.id}`}*/}
            {/*>*/}
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
            {/*</Link>*/}
            <ProductInfo>
                {/*<Link*/}
                {/*    href={`/product/${data.id}`}*/}
                {/*>*/}
                    <a>
                        <h3 className="product-title">{title}</h3>
                        <span className="product-weight">{weight}</span>
                    </a>
                {/*</Link>*/}
                <div className="product-meta">
                    {/*<Link*/}
                    {/*    href={`/product/${data.id}`}*/}
                    {/*>*/}
                        <a>
                            <div className="productPriceWrapper">
                                {discountInPercent ? (
                                    <span className="discountedPrice">
                                {currency}
                                        {price}
                             </span>
                                ) : null}

                                <span className="product-price">
                            {currency}
                                    {salePrice ? salePrice : price}
                        </span>
                            </div>
                        </a>
                    {/*</Link>*/}
                    {
                        (max_allocation > 0 && !((getNewItem(data.id)?.quantity) === max_allocation)) ?
                            !isInNewCart(data.id) ? (
                                <Button
                                    type='button'
                                    className="cart-button"
                                    variant="secondary"
                                    borderRadius={100}
                                    onClick={handleAddClick}
                                >
                                    <CartIcon mr={2}/>
                                    <ButtonText>
                                        <FormattedMessage
                                            id="addItem"
                                            defaultMessage="add Item"
                                        />
                                    </ButtonText>
                                </Button>
                            ) : (
                                <Counter
                                    max_allocation={max_allocation}
                                    value={getNewItem(data.id).quantity}
                                    onDecrement={handleRemoveClick}
                                    onIncrement={handleAddClick}
                                />
                            )
                            :
                            <Button
                                type='button'
                                className="out-of-stock-button"
                                disabled={requested_variant_id?.some((requested_id) => requested_id == data?.id) ? true : false}
                                // onClick={() => console.log('out of stock')}
                                onClick={() => {
                                    console.log('request stock');                                    
                                    handleRequestStock(data?.id)}
                                }
                            >
                                <CartIcon mr={2}/>
                                {/* <ButtonText> */}
                                    <Typography
                                        style={{
                                            fontSize: '0.7rem'
                                        }}
                                    >
                                        {requested_variant_id?.some((requested_id) => requested_id == data?.id) ? "Stock requested" : "Request stock"}
                                    </Typography>
                                {/* </ButtonText> */}
                            </Button>
                    }
                </div>
            </ProductInfo>
            {/* <MuiAlertBox
                showAlert={showAlert}
                setOpen={setShowAlert}/> */}
        </ProductCardWrapper>
    );
};

// @ts-ignore
export default AddProductCard