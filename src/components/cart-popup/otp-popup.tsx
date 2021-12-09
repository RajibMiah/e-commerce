import React, {useState} from 'react';
import {Box, Grid, makeStyles, Paper, Typography, Button} from '@material-ui/core';
import {closeModal} from "@redq/reuse-modal";
import OtpInput from 'react-otp-input';
import {addOrUpdateContact} from "redux/auth/action";
import {useDispatch} from "react-redux";
import MuiAlertBox from "../meterial-ui/alert-message/MuiAlert";
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
    container: {
        textAlign: 'center',
    },
    paper: {
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
const OtpPopup: React.FC<any> = ({item}) => {
    const classes: any = useStyles()
    const dispatch = useDispatch()
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: " ", type: ""});
    const [otpCode, setOtpCode] = useState('')
    const handleOtpChange = otp => {
        setOtpCode(otp);
    };

    const clearOtp = () => {
        setOtpCode('');
    };
    const handleSubmit = async (e) => {
        try {
            // @ts-ignore
            window.confirmationResult.confirm(otpCode).then((result) => {
                // User signed in successfully.
                dispatch(addOrUpdateContact(item.contactValue))
                closeModal() || item.setSubmitting(false)
            })
        } catch (err) {
            setShowAlert({
                isOpen: true,
                msg: err.code,
                type: 'error'
            })
        }
    }
    const handleResent = () => {
        // @ts-ignore
        window.grecaptcha.reset(window.captchaWidgetId);
    }
    React.useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault()
                setShowAlert({
                    isOpen: true,
                    msg:"please click on verify button",
                    type: 'warning'
                })
                //TODO:: OTP IS NOT SENDING TO HANDLE SUBMIT
                //handleSubmit(event)
            }
        };
        window !== undefined && document.addEventListener("keydown", listener);
        return () => {
          window !== undefined &&  document.removeEventListener("keydown", listener);
        };
    }, []);
    return (
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container className={classes.container}>
                    <Grid item xs={12}>
                        <Box component='label' className={classes.label}>
                            <Typography
                                variant='h4'
                                color='primary'
                                style={{fontWeight: 'bold'}}
                            >
                                Verification
                            </Typography>
                        </Box>
                        <Box component='label' className={classes.label}>
                            <Typography
                                variant='subtitle2'
                                color='textSecondary'
                                style={{fontWeight: 'bold'}}
                            >
                                you will get a <span style={{color: 'black', fontWeight: 'bold'}}>OTP</span> via SMS
                            </Typography>
                        </Box>
                    </Grid>
                    <Box className={classes.phoneInputStyle}>
                        <Box component='div'>
                            < OtpInput
                                inputStyle={classes.inputStyle}
                                numInputs={6}
                                hasErrored={true}
                                errorStyle="error"
                                onChange={handleOtpChange}
                                isInputNum={true}
                                value={otpCode}
                                focusStyle={classes.focusStyle}
                            />
                        </Box>
                    </Box>
                    <Grid item xs={12}>
                        {/*<MuiBtn*/}
                        {/*    text='Clear'*/}
                        {/*    color="primary"*/}
                        {/*    type="button"*/}
                        {/*    style={{marginRight: '15px'}}*/}
                        {/*    disabled={otpCode.otp.trim() === ''}*/}
                        {/*    onClick={clearOtp}*/}
                        {/*    className={classes.loginBtn}*/}
                        {/*/>*/}
                        <Button
                            className={classes.loginBtn}
                            variant="contained"
                            color='primary'
                            style={{marginLeft: '15px'}}
                            disabled={otpCode.length < 6}
                            onClick={handleSubmit}
                        >
                            <span
                                style={{
                                    fontWeight: 'bold'
                                }}
                            >
                                verify
                            </span>
                        </Button>
                    </Grid>
                    <Grid item xs={12} className={classes.navRoot}>
                        {/*<Typography*/}
                        {/*    className={classes.navTypo}*/}
                        {/*    component='div'*/}
                        {/*    color='textSecondary'*/}
                        {/*>*/}
                        {/*    if you don't get any otp?*/}
                        {/*</Typography>*/}
                        {/*<Typography*/}
                        {/*    className={classes.navTypo}*/}
                        {/*    component='div'*/}
                        {/*    color='primary'*/}
                        {/*    style={{marginLeft: '10px'}}*/}
                        {/*    onClick={handleResent}*/}

                        {/*>*/}
                        {/*    Resend It*/}
                        {/*</Typography>*/}
                    </Grid>
                </Grid>
            </Paper>
            <MuiAlertBox
                showAlert={showAlert}
                setOpen={setShowAlert}/>
        </Box>
    );
}
export default OtpPopup
