import { SEO } from "components/seo";
import OrderReceived from "features/order-received/order-received";
import React from "react";

const OrderReceivedPage = () => {
    return (
        <>
            <SEO title="Invoice - Shatkora" description="Invoice Details"/>
            <OrderReceived/>
        </>
    );
};

export default OrderReceivedPage;
