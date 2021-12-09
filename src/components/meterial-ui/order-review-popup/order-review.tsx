import React, {useState} from 'react'
import {Rating} from "@material-ui/lab";
import {Checkbox, Divider, TextField} from "@material-ui/core";

import {openModal, closeModal} from '@redq/reuse-modal';
import * as Yup from "yup";
import {
    CheckBoxContainer, CheckBoxMessage, Container,
    DontShowContainer, MuiDivider,
    OrderReviewContainer,
    OrderReviewTitleText,
    OrderReviewWrapper, PaperContainer, RiderText, SliderContainer, SubmitButton, SubmitButtonContainer
} from "./order-review.style";
import {useDispatch, useSelector} from "react-redux";
import {AuthState} from "redux/auth/reducer";
import MuiAlertBox from "../alert-message/MuiAlert";
import {ErrorMessage, Form, Formik, FormikProps} from "formik";
import {showOrderReview} from "redux/auth/action";
import ProductReviewPopup from "features/to-review/prodcut-review-popup";


type RootState = {
    auth: AuthState;
}

interface Values {
    order: number,
    delivery_timeline_rating: any,
    packaging_rating: any,
    product_quality_rating: any,
    rider_behaviour_rating: any
    message: string,
}


const FormValidationSchema = Yup.object().shape({
    // delivery_timeline_rating: Yup.string().required("delivery rating must be ratted")
});


const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
const OrderReview = ({data, orderId, onCloseBtnClick}) => {
    const dispatch = useDispatch()
    const {access_token} = useSelector((state: RootState) => state.auth);
    const [checked, setChecked] = React.useState(false);
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: " ", type: ""});
    const [value, setValue] = useState<Values>({
        order: orderId,
        delivery_timeline_rating: "0",
        packaging_rating: "0",
        product_quality_rating: "0",
        rider_behaviour_rating: "0",
        message: '',
    })
    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = async (values: Values, {setSubmitting}: any) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/order/v1/reviews/`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Token ${access_token}`,
                },
                method: 'POST',
                body: JSON.stringify(values)
            })
            if (response.ok) {
                dispatch(showOrderReview(checked))
                setShowAlert({
                    isOpen: true,
                    msg: 'successful',
                    type: 'success'
                })
                openModal({
                    show: true,
                    config: {
                        className: 'Popup',
                        width: 550,
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
                    component: ProductReviewPopup,
                    componentProps: {
                        onCloseBtnClick: closeModal,
                        scrollbarHeight: 330,
                        items: data,
                    },
                });
            }
            if (!response.ok) {
                setShowAlert({
                    isOpen: true,
                    msg: "sorry something is wrong",
                    type: 'error'
                })
            }
        } catch (error) {
            setShowAlert({
                isOpen: true,
                msg: "error",
                type: 'error'
            })
            onCloseBtnClick()
        }
    }

    return (
        <Formik
            initialValues={value}
            onSubmit={(values) => {
                if (parseInt(values.delivery_timeline_rating) !== 0) {
                    handleSubmit(values, false).then()
                } else {
                    setShowAlert({
                        isOpen: true,
                        msg: "Timeliness must be ratted",
                        type: 'error'
                    })
                }

            }}
            validationSchema={FormValidationSchema}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                  errors
              }: FormikProps<Values>) => (
                <Form>
                    <OrderReviewContainer>
                        <div>
                            <Container>
                                <OrderReviewWrapper>
                                    <OrderReviewTitleText>
                                        How would you rate the following for your last delivery?
                                    </OrderReviewTitleText>
                                </OrderReviewWrapper>
                                <PaperContainer>
                                    <OrderReviewWrapper>
                                        <OrderReviewTitleText id='title'>
                                            Timeliness
                                        </OrderReviewTitleText>
                                    </OrderReviewWrapper>
                                    <div>
                                        <OrderReviewWrapper>
                                            <Rating
                                                id='delivery_timeline_rating'
                                                name="delivery_timeline_rating"
                                                value={parseInt(values.delivery_timeline_rating)}
                                                onChange={handleChange}
                                            />
                                        </OrderReviewWrapper>
                                    </div>
                                </PaperContainer>
                                <PaperContainer>
                                    <OrderReviewWrapper>
                                        <OrderReviewTitleText id='title'>
                                            Product
                                        </OrderReviewTitleText>
                                    </OrderReviewWrapper>
                                    <div>
                                        <OrderReviewWrapper>
                                            <Rating
                                                id='product_quality_rating'
                                                name="product_quality_rating"
                                                value={parseInt(values.product_quality_rating)}
                                                onChange={handleChange}
                                            />
                                        </OrderReviewWrapper>
                                    </div>
                                </PaperContainer>

                                <PaperContainer>
                                    <OrderReviewWrapper>
                                        <OrderReviewTitleText id='title'>
                                            Packaging
                                        </OrderReviewTitleText>
                                    </OrderReviewWrapper>
                                    <div>
                                        <OrderReviewWrapper>
                                            <Rating
                                                id='packaging_rating'
                                                name="packaging_rating"
                                                value={parseInt(values.packaging_rating)}
                                                onChange={handleChange}
                                            />
                                        </OrderReviewWrapper>
                                    </div>
                                </PaperContainer>

                                <PaperContainer>
                                    <OrderReviewWrapper>
                                        <OrderReviewTitleText id='title'>
                                            Delivery Man
                                        </OrderReviewTitleText>
                                    </OrderReviewWrapper>
                                    <OrderReviewWrapper>
                                        <Rating
                                            id='rider_behaviour_rating'
                                            name="rider_behaviour_rating"
                                            value={parseInt(values.rider_behaviour_rating)}
                                            onChange={handleChange}
                                        />
                                    </OrderReviewWrapper>
                                </PaperContainer>
                            </Container>

                            <div>
                                <OrderReviewWrapper>
                                    <OrderReviewTitleText className={'textfield_title'}>
                                        Please write us  a few lines to describe your experience.
                                    </OrderReviewTitleText>
                                </OrderReviewWrapper>
                                <OrderReviewWrapper>
                                    <TextField
                                        name="message"
                                        id="filled-helperText"
                                        variant="filled"
                                        placeholder='Tell us about your last delivery'
                                        multiline
                                        onChange={handleChange}
                                    />
                                </OrderReviewWrapper>
                            </div>


                        </div>
                        {/*<DontShowContainer>*/}
                        {/*    <CheckBoxContainer>*/}
                        {/*        <Checkbox*/}
                        {/*            checked={checked}*/}
                        {/*            onChange={handleChecked}*/}
                        {/*            inputProps={{'aria-label': 'primary checkbox'}}*/}
                        {/*        />*/}
                        {/*    </CheckBoxContainer>*/}
                        {/*    <div>*/}
                        {/*        <CheckBoxMessage>Don't show again for this order.</CheckBoxMessage>*/}
                        {/*    </div>*/}
                        {/*</DontShowContainer>*/}
                        <SubmitButtonContainer>
                            <SubmitButton type="submit">
                                Submit
                            </SubmitButton>
                        </SubmitButtonContainer>
                        <MuiAlertBox
                            showAlert={showAlert}
                            setOpen={setShowAlert}/>
                    </OrderReviewContainer>
                </Form>
            )}
        </Formik>
    )
}

export default OrderReview