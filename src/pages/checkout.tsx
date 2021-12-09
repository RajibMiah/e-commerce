import React, {useEffect} from "react";
import {NextPage} from "next";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "@redq/reuse-modal";
import {AuthState as AuthState} from "redux/auth/reducer";
import {toggleSignInForm} from "redux/auth/action";
import AuthenticationForm from "features/authentication-form";
import {Checkout} from "features/checkouts";
import Unauthenticated from "components/error-message/unauthenticated";
import useAppConstants from "../data/use-app-constants";

type Props = {
    deviceType: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};

type RootState = {
    auth: AuthState;
}

const CheckoutPage: NextPage<Props> = ({deviceType}) => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state: RootState) => state.auth);


    const handleJoin = () => {
        dispatch(toggleSignInForm());
        !deviceType.mobile &&
        openModal({
            show: true,
            overlayClassName: "quick-view-overlay",
            closeOnClickOutside: true,
            component: AuthenticationForm,
            closeComponent: "",
            config: {
                enableResizing: false,
                disableDragging: true,
                className: "quick-view-modal",
                width: 458,
                height: "auto",
                animationFrom: {opacity: "0"},
                animationTo: {opacity: "1"},
                transition: {
                    delay: 500,
                },
                withRnd: false,
            },
        });
    };

    useEffect(() => {
        if (!isAuthenticated) handleJoin();
    }, [isAuthenticated]);

    return isAuthenticated ? (
        <>
            <Checkout deviceType={deviceType}/>
        </>
    ) : (
        <Unauthenticated title={"You must be sign in to view this page"} statusCode={"403"} deviceType = {deviceType}/>
    );
};

export default CheckoutPage;