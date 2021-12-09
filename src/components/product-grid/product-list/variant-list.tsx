import React, {useState} from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
    ButtonWrapper,
    LoaderItem,
    LoaderWrapper,
    VariantCardWrapper,
    VariantCol,
    VariantsRow,
} from "./variant-list.style";
import { CURRENCY } from "utils/constant";
import Placeholder from "components/placeholder/placeholder";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/no-result/no-result";
import { FormattedMessage } from "react-intl";
import { Button } from "components/button/button";
import useVariant, { QueryParams } from "data/use-variant";
import { ProductVariant } from "types/product-variant";
import firebase from "utils/firebase/firebase-config";
import {SEO} from "../../seo";
import {grocery_seo_data} from "seo-page-data/grocery-seo-data";
import useAutoScroll from "contexts/hooks/useAutoScroll";

const ErrorMessage = dynamic(() =>
    import("components/error-message/error-message")
);
const GeneralCard = dynamic(
    import("components/product-card/product-card-one/product-card-one")
);


interface VariantsProps {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    fetchLimit?: number;
    loadMore?: boolean;
    type?: string;
    categoryId?:any;
}


export const Variants: React.FC<VariantsProps> = ({
    categoryId,
    deviceType,
    type,
}) => {
    const { query }: { query: QueryParams } = useRouter();
    const [pageSize , setPageSize] = useState<number>(query.page_size || 10)
    const {
        isLoading, isReachingEnd, data, error, fetchMore
    } = useVariant({
        text: query.text,
        product: query.product,
        category:  (type === "grocery" && !query.category && !query.categories) ?'popular': query.category ,
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


    if (!isLoading && data.length === 0) {
        firebase.analytics().logEvent(`${query.text}_this_product_is_Not_Found`);
        return <NoResultFound/>;
    }


    const renderCard = (variant: ProductVariant) => {
        if(variant){
            return (
                <GeneralCard
                    title={variant.title}
                    description={variant.description}
                    image={variant?.images?.[0]?.thumbnail || '/no-image-available.webp'}
                    weight={variant.measurement}
                    currency={CURRENCY}
                    price={parseFloat(variant.original_price)}
                    salePrice={parseFloat(variant.sale_price)}
                    discountInPercent={Math.floor(variant.discount)}
                    max_allocation = {variant.max_allocation}
                    data={variant}
                    deviceType={deviceType}
                />
            );
        }else{
            return
        }
    };

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
                    (!query.category && !query.text && !query.categories) ?
                    data?.map((item: ProductVariant, index: number) => {
                        if (data.length === index + 1) {
                            return (
                                <VariantCol
                                    ref={observerRef}
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
                        }else{
                            return(
                                <VariantCol
                                    key={index}
                                    style={item.max_allocation > 0 ? {} : {display: "none"}}
                                >
                                    <VariantCardWrapper>
                                        <Fade
                                            duration={800}
                                            delay={index * 10}
                                            style={{ height: "100%" }}
                                        >
                                            {renderCard(item)}
                                        </Fade>
                                    </VariantCardWrapper>
                                </VariantCol>
                            )
                        }

                    })
                    :
                    data?.map((item: ProductVariant, index: number) => {
                        if (data.length === index + 1) {
                            return (
                                <VariantCol
                                    ref={observerRef}
                                    key={index}
                                    style={type === "book" ? {paddingLeft: 0, paddingRight: 1} : {}}
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
                        }else{
                            return(
                                <VariantCol
                                    key={index}
                                    style={type === "book" ? { paddingLeft: 0, paddingRight: 1 } : {}}
                                >
                                    <VariantCardWrapper>
                                        <Fade
                                            duration={800}
                                            delay={index * 10}
                                            style={{ height: "100%" }}
                                        >
                                            {renderCard(item)}
                                        </Fade>
                                    </VariantCardWrapper>
                                </VariantCol>
                            )
                        }

                    })
                }


            </VariantsRow>

            {isLoading &&
                <>
                <ButtonWrapper>
                    <Button
                        disabled
                        loading={isLoading}
                        // onClick={fetchMore}
                        // disabled={isLoading}
                        variant="secondary"
                        style={{
                            fontSize: 14,
                        }}
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
export default Variants;