import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, makeStyles, Paper, Typography, Button} from '@material-ui/core';
import OtpInput from 'react-otp-input';
import {openModal, closeModal} from '@redq/reuse-modal';
import {useDispatch, useSelector} from "react-redux";
import MuiAlertBox from "../../meterial-ui/alert-message/MuiAlert";
import {AuthState} from "redux/auth/reducer";
import OnSuccessReferPast from "./refferer-success-code-submit-popup";
import * as types from 'redux/auth/types';

type RootState = {
    auth: AuthState;
}
type Theme = {
    palette: any
    breakpoints: any
}
const useStyles = makeStyles((theme: Theme) => ({
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
        fontSize: "28px",
        lineHeight: "33.6px",
        fontFamily: 'Poppins'
    },
    subtitle: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '19.2px'
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
        paddingLeft: '25px',
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
    navTypo: {
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    phoneInputStyle: {
        position: 'relative',
        right: "1.01rem",
        margin: '29px 50px',
        [theme.breakpoints.down('sm')]: {
            margin: '29px auto',
            position: 'inherit',
            right: "0.58rem !important",
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
            width: '1.5rem !important',
            height: "2rem !important",
            fontSize: '1rem',
        },
    },
    focusStyle: {
        outlined: 'none !important',
        outlineWidth: '0px !important',
        outlineOffset: 'none !important'
    },
}))
const ReferCodeSubmitPopup: React.FC<any> = ({onCloseBtnClick}) => {
    const classes: any = useStyles()
    const dispatch = useDispatch()
    const {access_token} = useSelector((state: RootState) => state.auth);
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: " ", type: ""});
    const [referCode, setReferCode] = useState('')


    const handleSuccessPopup = (res: { message }) => {
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
            componentProps: {onCloseBtnClick: closeModal, scrollbarHeight: 330, response_message: res.message},
        });
    };

    const handleOtpChange = otp => {
        setReferCode(otp);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/discount/v3/referral-code/`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Token ${access_token}`,
                },
                method: 'POST',
                body: JSON.stringify({"code": referCode})
            })
            if (response.ok) {
                let res = await response.json()
                dispatch({type:types.IS_USER_USED_REFERRAL_CODE})
                closeModal()
                handleSuccessPopup(res)
            }
            if (!response.ok) {
                const error = await response.json()
                setShowAlert({
                    isOpen: true,
                    msg: error.message,
                    type: 'error'
                })
            }
        } catch (err) {
            setShowAlert({
                isOpen: true,
                msg: err,
                type: 'error'
            })
        }
    }

    const handleOnSkip = () => {
        setReferCode('');
        onCloseBtnClick()
    };


    React.useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault()
                // handleSubmit.call(this)
                setShowAlert({
                    isOpen: true,
                    msg: "please click on next button",
                    type: 'warning'
                })
                //TODO:: CODE IS NOT SENDING TO HANDLE SUBMIT

            }
        };
        window !== undefined && document.addEventListener("keydown", listener);
        return () => {
            window !== undefined && document.removeEventListener("keydown", listener);
        };
    }, []);
    return (
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container className={classes.container}>
                    <Grid item xs={12}>
                        <Box component='label' className={classes.label}>
                            <Typography
                                color='primary'
                                className={classes.title}
                            >
                                Do you have any referral code?
                            </Typography>
                        </Box>
                        <Box component='label' className={classes.label}>
                            <Typography
                                variant='subtitle2'
                                color='textPrimary'
                                className={classes.subtitle}
                            >
                                Paste your code here.
                            </Typography>
                        </Box>
                    </Grid>
                    <Box className={classes.phoneInputStyle}>
                        <Box component='div'>
                            <OtpInput
                                inputStyle={classes.inputStyle}
                                numInputs={8}
                                hasErrored={true}
                                errorStyle="error"
                                onChange={handleOtpChange}
                                isInputNum={true}
                                value={referCode}
                                focusStyle={classes.focusStyle}
                            />
                        </Box>
                    </Box>
                    <Grid item xs={12}>
                        <Button
                            className={classes.loginBtn}
                            variant="contained"
                            color='primary'
                            style={{marginLeft: '7px'}}
                            disabled={referCode.length < 8}
                            onClick={handleSubmit}
                        >
                            <Typography
                                variant='subtitle2'
                            >
                                Next
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className={classes.loginBtn}
                            variant="outlined"
                            color='primary'
                            onClick={handleOnSkip}
                            style={{
                                marginLeft: '7px',
                                marginBottom: '2.2rem'
                            }}
                        >
                            <Typography
                                variant='subtitle2'
                                color='primary'
                            >
                                Skip
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
export default ReferCodeSubmitPopup
