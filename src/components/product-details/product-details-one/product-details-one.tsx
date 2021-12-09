import React, {useEffect, useState} from "react";
import Link from "next/link";
import Router from "next/router";
import {Button} from "components/button/button";
import DoneIcon from '@material-ui/icons/Done';
import {
    BackButton,
    ButtonText,
    MetaItem,
    MetaSingle,
    ProductCartBtn,
    ProductCartWrapper,
    ProductDescription,
    ProductDetailsWrapper,
    ProductInfo,
    ProductMeta,
    ProductPreview,
    ProductPrice,
    ProductPriceWrapper,
    ProductTitle,
    ProductTitlePriceWrapper,
    ProductWeight,
    RelatedItems,
    SalePrice,
} from "./product-details-one.style";
import {LongArrowLeft} from "assets/icons/LongArrowLeft";
import UserReview from "components/meterial-ui/user-reivew-view/user-review";
import {CartIcon} from "assets/icons/CartIcon";
import ReadMore from "components/truncate/truncate";
import CarouselWithCustomDots from "components/multi-carousel/multi-carousel";
import RelatedList from "components/product-grid/related-list/related-list";
import {CURRENCY} from "utils/constant";
import {FormattedMessage} from "react-intl";
import {useLocale} from "contexts/language/language.provider";
import {useCart} from "contexts/cart/use-cart";
import {Counter} from "components/counter/counter";
import {ProductVariant} from "types/product-variant";
import {getProductItem} from "utils/api/product";
import {Chip, Typography} from "@material-ui/core";
import {Box} from "../../box";
import {Rating} from "@material-ui/lab";
import firebase from "utils/firebase/firebase-config";
import {SEO} from "../../seo";
import {useDispatch, useSelector} from "react-redux";
import {AuthState} from "redux/auth/reducer";
import {STATIC_NUMBER} from "features/user-profile/order/order-details/order-details";
import {remove_requested_variant_id, store_requested_variant_id} from "redux/auth/action";
import {handleJoin} from "utils/sign-in";

type ProductDetailsProps = {
    product: ProductVariant;
    deviceType: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};
export  type RootState = {
    auth: AuthState;
}

const defaultProductImg = [{
    alt: "default",
    id: 0,
    image: "/no-image-available.webp",
    thumbnail: '/no-image-available.webp'
}]

type StaticProps = {
    MINIMUM_MAX_ALLOCATION: number
}

const STATIC_PROPS: StaticProps = {
    MINIMUM_MAX_ALLOCATION: 0
}

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
                                                                          product,
                                                                          deviceType,
                                                                      }) => {
    const {isRtl} = useLocale();
    const dispatch = useDispatch()
    const {addItem, removeItem, isInCart, getItem} = useCart();
    const {isAuthenticated, access_token, requested_variant_id} = useSelector((state: RootState) => state.auth);
    const [categoryId, setCategoryId] = useState<number>()
    const [popularProductCode, setPopularProductCode] = useState<number>(194)
    const [ratingCount, setRatingCount] = useState<number>(0)
    const [productDescription, setProductDescription] = useState<string>()
    const [maxAllocation, setMaxAllocation] = useState<number>(product.max_allocation)
    const [isNewTab, setIsNewTab] = useState<boolean>(false)
    const data = product;
    const getProductCategory = () => {
        getProductItem(data.product).then(result => {
            const {categories, description} = result
            setProductDescription(description)
            categories.map((value, index) => {
                if (value !== popularProductCode && categories.length === index + 1) {
                    setCategoryId(value)
                }
            })
            return result
        });
    }
    const handleAddClick = (e) => {
        e.stopPropagation();
        addItem(data);
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        removeItem(data);
    };
    const handleChipClick = () => {

    }
    const handleRequestStock = async (variantId) => {

        if (!isAuthenticated) return handleJoin()

        // @ts-ignore
        if (requested_variant_id?.some((requested_id) => product.id === requested_id)) return

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

    useEffect(() => {
        getProductCategory()
        setMaxAllocation(product.max_allocation)
        setRatingCount(0)
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 500);
        window !== undefined && setIsNewTab(window.history.length === 1)
    }, [data.id]);

    useEffect(() => {
        // @ts-ignore
        if (product.max_allocation > STATIC_PROPS.MINIMUM_MAX_ALLOCATION && (requested_variant_id?.some((requested_id) => product?.id == requested_id))) {
            dispatch(remove_requested_variant_id(product?.id))
        }
    }, [product.max_allocation])

    useEffect(() => {
        firebase.analytics().logEvent(`${data.title}`);
    }, [data.title])

    return (
        <>
            <SEO
                title={product.title}
                description={productDescription}
                image={product?.images[0]?.image}
                url={`https://shatkora.co/product/${product.id}`}
            />
            <ProductDetailsWrapper className="product-card" dir="ltr">
                {!isRtl && (
                    <ProductPreview>
                        {
                            !isNewTab &&
                            <BackButton>
                                <Button
                                    type="button"
                                    size="small"
                                    style={{
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #f1f1f1",
                                        color: "#77798c",
                                    }}
                                    onClick={Router.back}
                                >
                                    <LongArrowLeft style={{marginRight: 5}}/>
                                    <FormattedMessage id="backBtn" defaultMessage="Back"/>
                                </Button>
                            </BackButton>}

                        <CarouselWithCustomDots
                            items={product.images.length !== 0 ? product.images : defaultProductImg}
                            deviceType={deviceType}
                        />
                    </ProductPreview>
                )}

                <ProductInfo dir={isRtl ? "rtl" : "ltr"}>
                    <ProductTitlePriceWrapper>
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductPriceWrapper>
                            {
                                product.discount !== 0 &&
                                <SalePrice>
                                    {CURRENCY}
                                    {product.original_price}
                                </SalePrice>
                            }

                            <ProductPrice>
                                {CURRENCY}
                                {product.sale_price ? product.sale_price : product.original_price}
                            </ProductPrice>
                        </ProductPriceWrapper>
                    </ProductTitlePriceWrapper>
                    <Box
                        component="fieldset"
                        borderColor="transparent"
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Rating name="read-only" value={data.rating} readOnly/>
                        <Box>
                            <span
                                style={{
                                    fontSize: '17px',
                                    fontWeight: "bold",
                                    margin: '10px',
                                }}
                            >
                                {data.rating.toFixed(1)}
                            </span>
                            <span>
                               ({ratingCount})
                            </span>
                        </Box>

                        <ProductCartWrapper>
                            <ProductCartBtn>
                                {
                                    (product.max_allocation > 0 && !((getItem(data.id)?.quantity) === product.max_allocation))
                                        ? !isInCart(data.id) ? (
                                            <Button
                                                type={'button'}
                                                className="cart-button"
                                                variant="secondary"
                                                borderRadius={100}
                                                onClick={handleAddClick}
                                            >
                                                <CartIcon mr={2}/>
                                                <ButtonText>
                                                    <FormattedMessage
                                                        id="addCartButton"
                                                        defaultMessage="Cart"
                                                    />
                                                </ButtonText>
                                            </Button>
                                        ) : (
                                            <Counter
                                                max_allocation={product.max_allocation}
                                                value={getItem(data.id).quantity}
                                                onDecrement={handleRemoveClick}
                                                onIncrement={handleAddClick}
                                            />
                                        )
                                        :
                                        product.max_allocation >= STATIC_NUMBER.LIMIT_LENGTH ?
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
                                            <div>
                                                <Button
                                                    type='button'
                                                    className="out-of-stock-button"
                                                    onClick={() => handleRequestStock(data?.id)}
                                                >

                                                    <ButtonText style={{fontSize: '0.8rem'}}>
                                                        {/*// @ts-ignore*/}
                                                        {requested_variant_id?.some((requested_id) => requested_id == data?.id) ? "Stock requested" : "Request stock"}
                                                    </ButtonText>
                                                </Button>
                                                {/* <p>
                                                    {requested_variant_id?.some((requested_id) => requested_id == data?.id) ? "Stock requested - (max_allocation = " + product.max_allocation+")" : "Request stocak - (max_allocation = " + product.max_allocation}
                                                </p> */}
                                            </div>
                                }
                            </ProductCartBtn>
                        </ProductCartWrapper>
                    </Box>

                    <ProductWeight>
                        <Typography
                            color="textPrimary"
                            variant={"subtitle1"}
                        >
                            Variants
                        </Typography>
                        <Chip
                            style={{border: '1px solid #37b063'}}
                            avatar={<DoneIcon/>}
                            label={product.measurement}
                            onClick={handleChipClick}
                        />
                    </ProductWeight>

                    <ProductDescription>
                        <ReadMore character={600}>{productDescription || `Supplied by ${data.supplier}`}</ReadMore>
                    </ProductDescription>
                    <Box
                        style={{
                            marginTop: "8px",
                            marginBottom: "8px"
                        }}
                    >
                        <Typography
                            variant={"subtitle2"}
                        >
                            Supplier: <span style={{color: 'red'}}>{data.supplier}</span>
                        </Typography>
                    </Box>
                    <Box>
                        {/*this component in redirecting review card*/}
                        <UserReview id={product.id} setRatingCount={setRatingCount}/>
                    </Box>
                    <ProductMeta>
                        <MetaSingle>
                            {product?.categories?.map((item: any) => (
                                <Link
                                    href={`/${product.type.toLowerCase()}?category=${item.slug}`}
                                    key={`link-${item.id}`}
                                >
                                    {
                                        <a>
                                            <MetaItem>{item.title}</MetaItem>
                                        </a>
                                    }
                                </Link>
                            ))}
                        </MetaSingle>
                    </ProductMeta>
                </ProductInfo>

                {isRtl && (
                    <ProductPreview>
                        <BackButton>
                            <Button
                                title="Back"
                                intlButtonId="backBtn"
                                iconPosition="left"
                                size="small"
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #f1f1f1",
                                    color: "#77798c",
                                }}
                                icon={<LongArrowLeft/>}
                                onClick={Router.back}
                            />
                        </BackButton>

                        <CarouselWithCustomDots
                            items={product.images}
                            deviceType={deviceType}
                        />
                    </ProductPreview>
                )}
            </ProductDetailsWrapper>

            <RelatedItems>
                <h2>
                    <FormattedMessage
                        id="intlRelatedItems"
                        defaultMessage="Related Items"
                    />
                </h2>
                <RelatedList
                    type={"grocery"}
                    deviceType={deviceType}
                    loadMore={false}
                    fetchLimit={10}
                    categoryId={categoryId}
                    itemId={product.id}
                />
            </RelatedItems>
        </>
    );
}
export default ProductDetails;
