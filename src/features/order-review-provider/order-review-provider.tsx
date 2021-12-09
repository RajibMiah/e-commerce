import React, {useEffect} from 'react'
import OrderReview from "components/meterial-ui/order-review-popup/order-review";
import {openModal, closeModal} from '@redq/reuse-modal';
import {AuthState} from "redux/auth/reducer";
import {useSelector} from "react-redux";

type RootState = {
    auth: AuthState;
}



const OrderReviewProvider = () => {
    const {isAuthenticated, isShowOrderReview} = window !== undefined && useSelector((state: RootState) => state.auth)

    useEffect(() => {
        let handler

        if (isAuthenticated) {
            handler = setInterval(async (event) => {
                const response = isAuthenticated && await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/v1/orders/`, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("access_token")}`,
                    },
                });
                const data: { results } = isAuthenticated && await response.json()

                if ((data?.results[0].status === 7 || data?.results[0].status === 6 || data?.results[0].status === 4) && data?.results[0].review === null) { // && !isShowOrderReview
                    openModal({
                        show: true,
                        config: {
                            className: 'Popup',
                            width: 500,
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
                        component: OrderReview,
                        componentProps: {
                            onCloseBtnClick: closeModal,
                            scrollbarHeight: 330,
                            data: data.results[0].items,
                            orderId: data.results[0].id
                        },
                    });
                    clearInterval(handler);

                }

            }, 50000) //50s after
        }
    }, [])

    return null
}

export default OrderReviewProvider
