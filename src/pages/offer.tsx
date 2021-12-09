import { Modal } from "@redq/reuse-modal";
import GiftCard from "components/gift-card/gift-card";
import { SEO } from "components/seo";
import CartPopUp from "features/carts/cart-popup";
import Footer from "layouts/footer";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { MainContentArea, OfferPageWrapper, ProductsCol, ProductsRow, } from "assets/styles/pages.style";

const ErrorMessage = dynamic(() =>
    import("components/error-message/error-message")
);

type GiftCardProps = {
    deviceType: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};

const GiftCardPage: NextPage<GiftCardProps> = ({ deviceType }) => {
    // const { data, error } = useCoupon();
    const { data, error } = { data: null, error: null };
    if (error) return <ErrorMessage message={error.message}/>;
    if (!data) return <p>Loading...</p>;

    return (
        <Modal>
            <SEO title="Offer - Shatkora" description="Offer Details" url={'https://shatkora.co/help'}/>
            <OfferPageWrapper>
                <MainContentArea>
                    <div style={{ width: "100%" }}>
                        <ProductsRow>
                            {data.map((coupon) => (
                                <ProductsCol key={coupon.id}>
                                    <GiftCard image={coupon.image} code={coupon.code}/>
                                </ProductsCol>
                            ))}
                        </ProductsRow>
                    </div>
                </MainContentArea>
                <Footer/>
            </OfferPageWrapper>
            <CartPopUp deviceType={deviceType}/>
        </Modal>
    );
};

export default GiftCardPage;
