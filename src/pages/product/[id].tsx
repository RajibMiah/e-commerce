import React from "react";
import {NextPage} from "next";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {Modal} from "@redq/reuse-modal";
import ProductSingleWrapper, {ProductSingleContainer,} from "assets/styles/product-single.style";
import {getProductVariantItem} from "utils/api/product-variant";
import Loading from "components/meterial-ui/circular-loading";

const ProductDetails = dynamic(() => import("components/product-details/product-details-one/product-details-one"), {ssr: false});

const CartPopUp = dynamic(() => import("features/carts/cart-popup"), {
    ssr: false,
});

type Props = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    data: any;
    [key: string]: any;
};

const ProductPage: NextPage<Props> = ({deviceType}) => {
    const {query} = useRouter()
    const {loading, data} = getProductVariantItem(query.id)
    if (loading) return <Loading/>;
    return (
        <>
            <Modal>
                <ProductSingleWrapper>
                    <ProductSingleContainer>
                        <ProductDetails product={data} deviceType={deviceType}/>
                        <CartPopUp deviceType={deviceType}/>
                    </ProductSingleContainer>
                </ProductSingleWrapper>
            </Modal>
        </>
    );
};


export default ProductPage;
