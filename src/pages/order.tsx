import {SEO} from "components/seo";
import Order from "features/user-profile/order/order";
import {PageWrapper} from "features/user-profile/user-profile.style";
import {NextPage} from "next";
import React from "react";
import {useSelector} from "react-redux";
import {AuthState} from "redux/auth/reducer";
import Unauthenticated from "components/error-message/unauthenticated";

type RootState = {
    auth: AuthState;
}
type Props = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
}

const OrderPage: NextPage<Props> = ({deviceType}) => {
    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    if (!isAuthenticated) return <Unauthenticated title={"You must be sign in to view this page"} statusCode={"403"} deviceType={deviceType}/>
    return (
        <>
            <SEO title="Order - Shatkora" description="Order Details"/>
            <PageWrapper>
                <Order/>
            </PageWrapper>
        </>
    )

};

export default OrderPage;