import React, {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {CURRENCY} from "utils/constant";
import Placeholder from "components/placeholder/placeholder";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/no-result/no-result";
import {FormattedMessage} from "react-intl";
import {Button} from "components/button/button";
import useVariant, {QueryParams} from "data/use-variant";
import {ProductVariant} from "types/product-variant";
import firebase from "utils/firebase/firebase-config";
import {SEO} from "../../seo";
import {grocery_seo_data} from "seo-page-data/grocery-seo-data";
import useAutoScroll from "contexts/hooks/useAutoScroll";
import {
    LoaderItem,
    LoaderWrapper,
    VariantCardWrapper,
    VariantCol,
    VariantsRow
} from "components/product-grid/product-list/variant-list.style";
import {ButtonWrapper} from "components/no-result/no-result.style";
import AddProductCard from "components/product-card/add-new-item/add-product-card";
import {useCart} from "contexts/cart/use-cart";

const ErrorMessage = dynamic(() =>
    import("components/error-message/error-message")
);


interface VariantsProps {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    orderId: number
    fetchLimit?: number;
    loadMore?: boolean;
    type?: string;
    categoryId?: any;
}

type PropsType = {
    MIN_INDEX: number;
    ADD_INDEX: number;
}

const STATIC_PROPS: PropsType = {
    MIN_INDEX: 0,
    ADD_INDEX: 1
}


export const AddOrderVariantList: React.FC<VariantsProps> = ({
                                                                 categoryId,
                                                                 deviceType,
                                                                 type,
                                                                 orderId
                                                             }) => {
    const {query}: { query: QueryParams } = useRouter();
    const {Qty} = useCart()
    const [pageSize, setPageSize] = useState<number>(query.page_size || 10)
    const [filteredData, setFilteredData] = useState([])
    const {
        isLoading, isReachingEnd, data, error, mutate, fetchMore
    } = useVariant({
        text: query.text,
        product: query.product,
        category: (type === "grocery" && !query.category && !query.categories) ? 'popular' : query.category,
        categories: query.categories,
        categoryId: categoryId,
        is_featured: query.is_featured,
        ordering: query.ordering,
        page_size: pageSize
    });
    const {observerRef} = useAutoScroll({isLoading, isReachingEnd, fetchMore})
    if (error) return <ErrorMessage message={error.message}/>;
    if (isLoading && false) {
        return (
            <LoaderWrapper>
                <LoaderItem>
                    <Placeholder uniqueKey="1"/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="2"/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="3"/>
                </LoaderItem>
            </LoaderWrapper>
        );
    }


    useEffect(() => {

        /*
         NOTE:: THIS FILTER METHOD REMOVE ALL THE VARIANT  WHICH  IS EQUAL TO  THE ALREADY ADDED ORDERED  VARIANT ID.
         OTHERWISE THE PRODUCT WILL SHOW IN THE POPUP WHEN USER TRY TO ADDED NEW ITEM ON EXISTING ORDER
         */

        const newData = data.filter((item) => item.id !== Qty.find((qty) => qty.variant.id === item.id)?.variant?.id)

        setFilteredData(newData)
    }, [!isLoading, isReachingEnd])

    if (!isLoading && data.length === STATIC_PROPS.MIN_INDEX) {
        firebase.analytics().logEvent(`${query.text}_this_product_is_Not_Found`);
        return <NoResultFound/>;
    }

    const renderCard = (variant: ProductVariant) => {
        if (variant) {
            return (
                <AddProductCard
                    orderId={orderId}
                    title={variant.title}
                    description={variant.description}
                    image={variant?.images?.[STATIC_PROPS.MIN_INDEX]?.thumbnail || '/no-image-available.webp'}
                    weight={variant.measurement}
                    currency={CURRENCY}
                    price={parseFloat(variant.original_price)}
                    salePrice={parseFloat(variant.sale_price)}
                    discountInPercent={Math.floor(variant.discount)}
                    max_allocation={variant.max_allocation}
                    data={variant}
                    deviceType={deviceType}
                />
            );
        }
    };

    console.log('add order > ', data);
    console.log('cart > ', Qty);
    console.log('filtered data > ', filteredData);
    
    

    return (
        <>
            <SEO
                title={query.category as string}
                description={grocery_seo_data.description}
                image={grocery_seo_data.image}
                url={`https://shatkora.co/?category=${query.category}`}
            />
            <VariantsRow>
                {
                    filteredData?.map((item: ProductVariant, index: number) => {
                        // console.log('filtered item > ', item);
                        return (
                            <VariantCol
                                // ref={observerRef}
                                key={index}
                            >
                                <VariantCardWrapper>
                                    <Fade
                                        duration={800}
                                        delay={index * 10}
                                        style={{height: "100%"}}
                                    >
                                        {renderCard(item)}
                                    </Fade>
                                </VariantCardWrapper>
                            </VariantCol>
                        )
                        // if (filteredData.length === index + STATIC_PROPS.ADD_INDEX) {
                        //     return (
                        //         <VariantCol
                        //             // ref={observerRef}
                        //             key={index}
                        //         >
                        //             <VariantCardWrapper>
                        //                 <Fade
                        //                     duration={800}
                        //                     delay={index * 10}
                        //                     style={{height: "100%"}}
                        //                 >
                        //                     {renderCard(item)}
                        //                 </Fade>
                        //             </VariantCardWrapper>
                        //         </VariantCol>
                        //     )
                        // } else {
                        //     return (
                        //         <VariantCol
                        //             key={index}
                        //             style={item.max_allocation > STATIC_PROPS.MIN_INDEX ? {} : {display: "none"}}
                        //         >
                        //             <VariantCardWrapper>
                        //                 <Fade
                        //                     duration={800}
                        //                     delay={index * 10}
                        //                     style={{height: "100%"}}
                        //                 >
                        //                     {renderCard(item)}
                        //                 </Fade>
                        //             </VariantCardWrapper>
                        //         </VariantCol>
                        //     )
                        // }
                    })
                }
            </VariantsRow>
            {
                isLoading &&
                <>
                    <ButtonWrapper>
                        <Button
                            disabled
                            loading={isLoading}
                            variant="secondary"
                            style={{fontSize: 14}}
                            border="1px solid #f1f1f1"
                            type="text">
                            <FormattedMessage id="loadMoreButton" defaultMessage="Loading..."/>
                        </Button>
                    </ButtonWrapper>
                </>
            }
        </>
    );
};
export default AddOrderVariantList;