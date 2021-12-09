import React, {useEffect, useState} from 'react'
import {
    Button,
    FormControl,
    Grid, IconButton,
    InputAdornment,
    OutlinedInput,
    Typography, useMediaQuery,
} from "@material-ui/core";
import {
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TelegramShareButton,
    WhatsappShareButton,
    TelegramIcon,
    WhatsappIcon,
} from "react-share";
import {makeStyles} from "@material-ui/styles";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import MuiAlert from "components/meterial-ui/alert-message/MuiAlert";
import {openModal, closeModal} from '@redq/reuse-modal';
import ReferCodeSubmitPopup from 'components/cart-popup/user-refferer-components/refer-code-popup'
import {useReferral} from "data/use-referral";
import {useWallet} from "data/use-wallet";
import {LoaderBox} from "components/loader/loader.style";
import Loader from "components/loader/loader";
import {MdContentCopy} from 'react-icons/md'
import {
    AddReferCodeBtn,
    AddReferCodeText,
    BalanceContainer, CurrentBalance,
    CurrentBalanceText,
    EarnMore
} from "features/user-profile/Wallet/wallet.style";
import Cash from "assets/icons/Cash";
import Router from "next/router";
import {AuthState} from "redux/auth/reducer";
import {useSelector} from "react-redux";
import {useTheme} from "styled-components";

interface Theme {
    palette: any,
    breakpoints: any
}

type RootState = {
    auth: AuthState;
}

// @ts-ignore
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiTypography-h5': {
            fontWeight: "700"
        }
    },
    orderNowBtn: {
        color: '#ffff',
        background: '#50B152',
        border: '1px solid #50B152',
        boxSizing: 'border-box',
        borderRadius: '4px',
        width: '12rem',
        height: '3.5rem',
        [theme.breakpoints.down('sm')]: {
            width: "auto",
            height: 'auto',
            fontSize: '11px'
        },
    },
    msgTitle: {
        marginTop: "13px",
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '36px',
        lineHeight: '48PX',
        color: '#009443',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
    },
    cashSvgContainer: {
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            padding: '2rem'
        },
    },
    msg: {
        marginTop: "13px",
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '24px',
        color: '#3C3C3C',
        [theme.breakpoints.down('sm')]: {
           textAlign:'center'
        },
    },
    code: {
        "& .MuiFormControl-root": {
            borderRadius: '5px',
            borderColor: 'none !important',
            width: "45%",
            background: '#F8F8F8',
            [theme.breakpoints.down('sm')]: {
                width: "100%",
            },
        },
        "& .MuiOutlinedInput-input": {
            color: '#000000',
            letterSpacing: '6px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '20px',
            lineHeight: '30px',
            textAlign: 'center',
        }
    },
    referFieldTitle: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '21px',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#ABABAB',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
    },
    comingSoon: {
        color: "#77798c",
        textAlign: "start",
        fontSize: "2rem",
        [theme.breakpoints.down('sm')]: {
            paddingTop: "3.5rem",
            textAlign: "center",
        },
    },
    sendVerification: {
        color: '#ffff',
        background: '#50B152',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '500',
        border: '1px solid #50B152',
        boxSizing: 'border-box',
        borderRadius: '4px',
        minWidth: '12rem',
        minHeight: '3.5rem',
        [theme.breakpoints.down('sm')]: {
            minWidth: '5.5rem !important',
        },
    },
    emailTextFiled: {
        width: "100%",
        "& .MuiFormControl-root": {
            borderRadius: '5px',
            width: "100%",
            [theme.breakpoints.down('sm')]: {
                width: "95%",
                margin: '0 auto'
            },
        },
    },
    referCode: {
        display: "block",
        textAlign: 'center',
        fontWeight: "bolder"
    },
    referCodeContainer: {
        marginTop: "13px",
        [theme.breakpoints.down('sm')]: {
            marginTop: "3rem"
        },
    },
    offerDetails: {
        [theme.breakpoints.down('sm')]: {
            // display: 'flex',
            // flexDirection: 'column-reverse'
        },
    },
    shareStyle: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '20px',
        lineHeight: '30px',
        textAlign: 'center',
        opacity: '0.8',
        padding: '2rem',
    },
    referTitle: {
        width: "45%",
        textAlign: "center",
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        }
    },
    nullText: {
        [theme.breakpoints.down('sm')]: {
            // display: 'flex',
            // flexDirection: 'column'
            justifyContent:'center'
        }

    },
    copyText: {
        color: `${theme.palette.primary.main}`,
        fontSize: '23px',
        fontWeight: "bolder",
        display: "block",
        textAlign: 'center',
        cursor: 'pointer'
    },
    msgText: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            margin: '1rem',
            textAlign: 'center',
            fontSize: '0.8rem',
        }
    }
}))

const Refer = () => {
    const classes = useStyles()
    const {loading, referral} = useReferral()
    const title = 'shatkora referral code';
    const {isUserUsedReferralCode} = useSelector((state: RootState) => state.auth)
    const [referrerCashback, setReferrerCashback] = useState<number>(0)
    const [refereeCashBack, setRefereeCashBack] = useState<number>(0)
    const [copiedState, setCopiedState] = useState({value: "", copied: false})
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: '', type: ''})
    const [isUserUsedReferral, setIsUserUsedReferralCode] = useState<boolean>(false)
    const handleCopy = () => {
        setCopiedState({...copiedState, copied: true})
        setShowAlert({
            isOpen: true,
            msg: 'copied',
            type: 'success'
        })
    }
    useEffect(() => {
        setCopiedState({
            ...copiedState,
            value: referral?.code
        })
        setReferrerCashback(referral?.general_info?.referrer_cashback)
        setRefereeCashBack(referral?.general_info?.referee_cashback)
        setIsUserUsedReferralCode(referral?.used_referral_code)

    }, [referral])

    const handleOpenReferCodeSubmitPopup = () => {
        openModal({
            show: true,
            config: {
                className: 'Popup',
                width: 600,
                height: 'auto',
                enableResizing: true,
                disableDragging: true,
                animationFrom: {transform: 'scale(1)'}, // react-spring <Spring from={}> props value
                animationTo: {transform: 'scale(1)'}, //  react-spring <Spring to={}> props value
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

    if (loading) return <LoaderBox><Loader/></LoaderBox>;
    return (
        <Grid container className={classes.root}>
            <Grid container style={{padding: '7px'}}>
                <Grid item xs={12}>
                    {
                        !isUserUsedReferral && !isUserUsedReferralCode && !(referrerCashback === 0 && refereeCashBack === 0) &&
                        <div style={{display: 'flex'}}>
                            <AddReferCodeText>
                                Do you have any referral code?
                            </AddReferCodeText>
                            <AddReferCodeBtn onClick={handleOpenReferCodeSubmitPopup}>
                                Add it
                            </AddReferCodeBtn>
                        </div>
                    }

                </Grid>
                <Grid item xs = {12} container className={classes.offerDetails}>

                    {(referrerCashback === 0 && refereeCashBack === 0) ?
                        <Grid item xs={12} md={7} container className={classes.nullText}>
                            <Grid item container xs={12}>
                                <Grid item xs={12}>
                                    <Typography className={classes.msgTitle}>
                                        Refer now & earn
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Typography
                                    variant='h3'
                                    // className={classes.referFieldTitle}
                                    className={classes.comingSoon}
                                >
                                    Coming Soon
                                </Typography>
                            </Grid>
                        </Grid>
                        :
                        <Grid item container xs={12} md={7}>
                            <Grid item xs={12}>
                                <Typography className={classes.msgTitle}>
                                    Refer now & earn Tk. {referrerCashback}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.msg}>
                                    Share your code with your friends and earn Tk. <b>{referrerCashback}</b> when he
                                    place
                                    his first order.
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                    <Grid item xs className={classes.cashSvgContainer}>
                        <Cash/>
                    </Grid>
                </Grid>
                {(referrerCashback === 0 && refereeCashBack === 0) ? null
                    :
                    <>
                        <Grid item xs={12} container className={classes.referCodeContainer}>
                            <Grid item className={classes.referTitle}>
                                <Typography className={classes.referFieldTitle}>
                                    Your Referral Code
                                </Typography>
                            </Grid>
                            <Grid item xs={12} container className={classes.code}>
                                <FormControl variant="outlined" disabled={true}>
                                    <OutlinedInput
                                        value={copiedState.value}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <CopyToClipboard
                                                    text={copiedState.value}
                                                    onCopy={handleCopy}
                                                >
                                                    <div>
                                        <span className={classes.copyText}>
                                           <MdContentCopy/>
                                        </span>
                                                    </div>

                                                </CopyToClipboard>
                                            </InputAdornment>
                                        }
                                        labelWidth={0}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.shareStyle}>
                                or share via
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.msgText}>
                                <IconButton color="primary" component="span">
                                    <FacebookMessengerShareButton
                                        url={copiedState.value}
                                        appId="521270401588372"
                                        style={{display: 'flex'}}
                                    >
                                        <FacebookMessengerIcon size={32} round/>
                                    </FacebookMessengerShareButton>
                                </IconButton>

                                <IconButton color="primary" component="span">
                                    <WhatsappShareButton
                                        url={copiedState.value}
                                        title={title}
                                        separator=":: "
                                        style={{display: 'flex'}}
                                    >
                                        <WhatsappIcon size={32} round/>
                                    </WhatsappShareButton>
                                </IconButton>
                                <IconButton color="primary" component="span">
                                    <TelegramShareButton
                                        url={copiedState.value}
                                        title={title}
                                        style={{display: 'flex'}}
                                    >
                                        <TelegramIcon size={32} round/>
                                    </TelegramShareButton>

                                </IconButton>
                            </div>
                        </Grid>
                    </>
                }
            </Grid>
            <MuiAlert
                showAlert={
                    showAlert
                }
                setOpen={setShowAlert}
            />
        </Grid>
    )
}
export default Refer