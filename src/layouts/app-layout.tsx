import React, {useEffect} from "react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import Sticky from "react-stickynode";
import {useAppState} from "contexts/app/app.provider";
import Header from "./header/header";
import {LayoutWrapper} from "./layout.style";
import {isCategoryPage} from "./is-home-page";
import {checkProfile, getUserProfile, updateTotalReferee} from "../redux/auth/action";
import {useDispatch, useSelector} from "react-redux";
import {openModal, closeModal} from "@redq/reuse-modal";
import OnSuccessReferPast from "components/cart-popup/user-refferer-components/referee-success-popup";

const MobileHeader = dynamic(() => import("./header/mobile-header"), {
    ssr: false,
});

type LayoutProps = {
    className?: string;
    token?: string;
};

type RootState = {
    subcategories: any;
    child: any;
    auth: {
        isAuthenticated,
        referralInfo: {
            total_referee: number
        }
    }

}

const Layout: React.FunctionComponent<LayoutProps> = ({
                                                          className,
                                                          children,
                                                          token,
                                                      }) => {
    const {pathname, query} = useRouter();
    const dispatch = useDispatch()
    const {isAuthenticated} = window !== undefined && useSelector((state: RootState) => state.auth)
    const totalReferee = window !== undefined && useSelector((state: RootState) => state.auth?.referralInfo?.total_referee)
    const isSticky =
        useAppState("isSticky") ||
        pathname === "/furniture-two" ||
        pathname === "/grocery-two";

    const handleTotalReferred = React.useCallback((totalReferred) => {
        openModal({
            show: true,
            config: {
                className: 'Popup',
                width: 600,
                height: 'auto',
                enableResizing: true,
                disableDragging: true,
                animationFrom: {transform: 'scale(1)'},
                animationTo: {transform: 'scale(1)'},
                transition: {
                    tension: 360,
                    friction: 40,
                },
            },
            closeOnClickOutside: true,
            component: OnSuccessReferPast,
            closeComponent: () => <div/>,
            componentProps: {onCloseBtnClick: closeModal, scrollbarHeight: 330, totalReferred: totalReferred},
        });
    }, [])

    useEffect(()=>{
        let handleProfileCheck = setInterval(()=>{
            isAuthenticated &&  dispatch(checkProfile())
            clearInterval(handleProfileCheck)
        },1000)
    },[pathname])

    useEffect(() => {
        let handler

        if(isAuthenticated){
             handler = setInterval(async (event) => {

                /**
                 * NOTE:: check is user  authorized or not  for showing referral success popup message  and also because of useEffect check inside the referral response object is
                 *   the total referee exist or not otherwise it will be create NaN inside redux store
                 */
                const response = isAuthenticated && await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/discount/v3/referral-code/`, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("access_token")}`,
                    },
                });
                const data: any = isAuthenticated && await response.json()
                if (isAuthenticated && data.total_referee !== undefined && totalReferee !== data.total_referee && totalReferee !== undefined) {
                    let currentMaxReferee = Math.abs(data?.total_referee - totalReferee)
                    dispatch(updateTotalReferee(data?.total_referee))
                    handleTotalReferred(currentMaxReferee)// after 1s
                    clearInterval(handler);
                }
            }, 50000) //1min after
        }
    }, [])

    const isHomePage = isCategoryPage(query.type) || pathname === "/bakery";
    return (
        <LayoutWrapper className={`layoutWrapper ${className}`}>
            <Sticky enabled={isSticky} innerZ={1001}>
                <MobileHeader
                    className={`${isSticky ? "sticky" : "unSticky"} ${
                        isHomePage ? "home" : ""
                    } desktop`}
                />

                <Header
                    className={`${isSticky ? "sticky" : "unSticky"} ${
                        isHomePage ? "home" : ""
                    }`}
                />
            </Sticky>
            {children}
        </LayoutWrapper>
    );
};

export default Layout;