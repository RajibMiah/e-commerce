import React, {useEffect, useState} from 'react';
import {Box, Grid, makeStyles, Paper, Typography, Button, IconButton} from '@material-ui/core';
import MuiAlertBox from "../../meterial-ui/alert-message/MuiAlert";
import {useReferral} from "data/use-referral";
import Router from "next/router";
import {
    FacebookMessengerIcon,
    FacebookMessengerShareButton, TelegramIcon,
    TelegramShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
// @ts-ignore
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiOutlinedInput-input': {
            fontSize: 'smaller',
            fontWeight: 'bold'
        },
        '& .MuiFormControlLabel-label': {
            fontSize: 'smaller',
            fontWeight: 'bold'
        },
        '& .MuiFormControlLabel-root': {
            margin: '15px'
        }
    },
    title: {
        fontWeight: 'normal',
        fontSize: "24px",
        lineHeight: "33.6px",
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FF7070',
    },
    subtitle: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '18px',
        lineHeight: '30px',
        letterSpacing: '0em',
        textAlign: 'center'
    },
    container: {
        textAlign: 'center',
    },
    paper: {
        padding: '17px',
        width: '100%',
        margin: '0 auto',
        borderColor: theme.palette.primary,
        backgroundPositionX: 'right',
    },
    label: {
        display: 'block',
        paddingTop: '25px'
    },
    loginBtn: {
        width: '90%',
        margin: '8px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px'
        },
    },
    navRoot: {
        justifyContent: 'center',
        padding: '9px',
        display: 'flex',
    },
    msgQuotes: {
        padding: "13px",
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '25px'
    },
    msgCode: {
        fontWeight: 'bold',
        padding: '7px'
    },
    msg: {
        padding: "7px",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '25px'
    },
    navTypo: {
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    phoneInputStyle: {
        margin: '0 auto',
        padding: '25px',
        [theme.breakpoints.down('sm')]: {
            padding: "2rem 0px !important",
            margin: 'none'
        },

    },
    inputStyle: {
        width: '3rem !important',
        height: '4rem',
        margin: '0 7px',
        fontSize: '3rem',
        borderRadius: '7px',
        borderColor: 'initial',
        [theme.breakpoints.down('sm')]: {
            width: '2.3rem !important',
            height: "3rem !important"
        },
    },
    focusStyle: {
        outlined: 'none !important',
        outlineWidth: '0px !important',
        outlineOffset: 'none !important'
    },
}))
const OnSuccessReferPast: React.FC<any> = ({item, onCloseBtnClick, totalReferred}) => {
    const classes: any = useStyles()
    const {referral} = useReferral()
    const title = 'shatkora referral code';
    const [referrer_Cashback, setReferrerCashback] = useState<number>(0)
    const [referee_CashBack, setRefereeCashBack] = useState<number>(0)
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: " ", type: ""});
    const [copiedState, setCopiedState] = useState({value: "", copied: false})
    useEffect(() => {
        setCopiedState({
            ...copiedState,
            value: referral?.code
        })
        setReferrerCashback(referral?.general_info?.referrer_cashback)
        setRefereeCashBack(referral?.general_info.referee_cashback)
    }, [referral])
    return (
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container className={classes.container}>
                    <Grid item xs={12}>
                        <Box component='label' className={classes.label}>
                            <Typography className={classes.title}>
                                Congratulations!
                            </Typography>
                        </Box>

                        <Box component='label' className={classes.label}>
                            <Typography
                                color='primary'
                                className={classes.subtitle}
                            >
                                You have received tk <b>{(referrer_Cashback * totalReferred)}</b> added to your wallet as referral cashback.
                            </Typography>
                        </Box>
                        {/*{*/}
                        {/*    referee_CashBack !== 0 &&*/}
                        {/*    <Box component='label'>*/}
                        {/*        <Typography*/}
                        {/*            color='textPrimary'*/}
                        {/*            className={classes.msgQuotes}*/}
                        {/*        >*/}
                        {/*            You're Referral got Tk <b>{referrer_Cashback}</b> off in his/her first order.*/}
                        {/*        </Typography>*/}
                        {/*    </Box>*/}
                        {/*}*/}
                    </Grid>
                    <Grid item container style={{width: "80%", margin: '0 auto', padding: "13px"}}>
                        <Grid item xs={12}>
                            <Box component='label'>
                                <Typography
                                    color='textPrimary'
                                    className={classes.msgCode}
                                >
                                    Your Code :: {referral?.code}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box component='label'>
                                <Typography
                                    color='textPrimary'
                                    className={classes.msg}
                                >
                                    Share your codes with your friends and
                                    get more money.
                                </Typography>
                            </Box>
                        </Grid>
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
                    <Grid item xs={12}>
                        <Button
                            className={classes.loginBtn}
                            variant="outlined"
                            color='primary'
                            style={{marginLeft: '7px', marginBottom: '2.2rem'}}
                            onClick={() => {
                                onCloseBtnClick()
                            }}
                        >
                            <Typography
                                variant='subtitle2'
                                color='primary'
                            >
                                Later
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <MuiAlertBox
                showAlert={showAlert}
                setOpen={setShowAlert}/>
        </Box>
    );
}
export default OnSuccessReferPast
