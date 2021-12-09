import React, {useEffect, useState} from "react";
import {Button, Container, Heading, IconWrapper, Offer, Wrapper,} from "./authentication-form.style";
import {Google} from "assets/icons/Google";
import {FormattedMessage, useIntl} from "react-intl";
import {openModal, closeModal} from "@redq/reuse-modal";
import {LoginIllustration} from "assets/icons/LoginIllustration";
import {GoogleLoginResponse, useGoogleLogin} from "react-google-login";
import {bindActionCreators} from "redux";
import {addReferralInfo, getUserProfile, signIn} from "redux/auth/action";
import {connect, useDispatch, useSelector} from "react-redux";
import firebase from "utils/firebase/firebase-config";
import {AuthState} from "redux/auth/reducer";
import AlertMessage from "components/alert-message/alert-message";
import ReferCodeSubmitPopup from "components/cart-popup/user-refferer-components/refer-code-popup";

interface SignInModalProps {
    access_token: string | null;
    signIn: typeof signIn;
    getUserProfile: typeof getUserProfile;
}

type RootState = {
    auth: AuthState;
    isUserUsedReferralCode: boolean;
}

const SignInModal = ({signIn: serverSignIn}: SignInModalProps) => {
    const intl = useIntl();
    const dispatch = useDispatch()
    const {access_token, isUserUsedReferralCode} = useSelector((state: RootState) => state.auth);

    const [errorMessage, setErrorMessage] = useState<any>({type: '', text: ' '})
    const [open, setOpen] = useState<boolean>(false)

    const handleOpenReferCodeSubmitPopup = () => {
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
            component: ReferCodeSubmitPopup,
            closeComponent: () => <div/>,
            componentProps: {onCloseBtnClick: closeModal, scrollbarHeight: 330},
        });
    };

    const {signIn, loaded} = useGoogleLogin({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID,
        isSignedIn: false,
        uxMode: "popup",
        scope: "profile email",
        accessType: "online",
        responseType: "token",

        onAutoLoadFinished: () => console.log("onAutoLoadFinished"),
        onSuccess: async (loginResponse: GoogleLoginResponse) => {
            // callNotificationPermission()
            closeModal()
            const onFetchSuccess = () => {
                setTimeout(async () => {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/discount/v3/referral-code/`, {
                        headers: {
                            "Authorization": `Token ${localStorage.getItem("access_token")}`,
                        },
                    });
                    const data = await res.json()
                    dispatch(addReferralInfo(data))
                    !data?.used_referral_code && !isUserUsedReferralCode && !(data?.general_info?.referrer_cashback === 0 && data?.general_info?.referee_cashback === 0) && handleOpenReferCodeSubmitPopup()
                }, 1000)
            }
            serverSignIn(loginResponse.accessToken, onFetchSuccess);
        },
        onFailure: (error) => {
            console.log("onFailure", error);
            if (error.error === 'idpiframe_initialization_failed') {
                setErrorMessage({type: 'warning', text: 'Please enable all cookies option in your setting to sign in'})
                setOpen(true)
            }
            // TODO: render some error message.
        },
    });

    const callNotificationPermission = () => {
        if (typeof window !== "undefined") {
            // browser code
            const messaging = firebase.messaging()
            messaging.requestPermission().then(() => {
                return messaging.getToken()
            })
                .then(async (token) => {
                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/firebase/v1/tokens/`, {
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": `Token ${access_token}`,
                            },
                            method: 'PUT',
                            body: JSON.stringify({"push_token": token})
                        })
                        if (response.ok) {
                            console.log('firebase notification token send to server')
                        }
                    } catch (error) {
                        console.log('error on sending firebase token to server', error)
                    }
                })
                .catch(err => console.log(" notification permission denied", err))
        } else {
            console.log('this browser not supported the firebase  messaging')
        }

    }

    return (
        <Wrapper>
            <Container>
                <Heading>
                    <FormattedMessage id='welcomeBack' defaultMessage='Welcome Back'/>
                </Heading>

                <IconWrapper>
                    <LoginIllustration/>
                </IconWrapper>

                <Button
                    variant='primary'
                    size='big'
                    style={{
                        width: "100%",
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #37B063",
                        color: "#081F32"
                    }}
                    onClick={signIn}
                >
                    <IconWrapper>
                        <Google/>
                    </IconWrapper>
                    <FormattedMessage
                        id='continueGoogleBtn'
                        defaultMessage='Sign in with Google'
                    />
                </Button>

                <Offer style={{padding: "20px 0"}}>

                </Offer>
            </Container>
            <AlertMessage message={errorMessage} open={open} setOpen={setOpen}/>
        </Wrapper>
    );
};

const mapStateToProps = state => ({
    access_token: state.auth.access_token
});

const mapDispatchToProps = dispatch => {
    return {
        signIn: bindActionCreators(signIn, dispatch),
        getUserProfile: bindActionCreators(getUserProfile, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal);
