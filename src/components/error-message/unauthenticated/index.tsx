import React from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {openModal} from "@redq/reuse-modal";
import UnauthorizedSvg from "assets/icons/unauthorized";
import {toggleSignInForm} from "redux/auth/action";
import AuthenticationForm from "features/authentication-form";
import {useDispatch} from "react-redux";
import {JoinBtn} from "./index.style";
import {NextPage} from "next";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: 'center'
    },

}))

interface Props{
    title:string,
    statusCode?:string,
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };

}
const Index : NextPage<Props> = ({title, statusCode, deviceType}) => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const handleJoin = () => {
        dispatch(toggleSignInForm());

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
            },
        });
    };
    return (
        <Grid container className={classes.root}>
            {
                !deviceType.mobile &&
                <Grid item xs={12}>
                    <UnauthorizedSvg/>
                </Grid>
            }


            <Grid item container style={{justifyContent: "center", margin: "1rem"}}>
                <Grid item xs={12} style={{padding: '1rem'}}>
                    <Typography
                        variant='h5'
                        style={{paddingBottom: "1rem", opacity: "0.5"}}
                    >
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <JoinBtn
                        variant="contained"
                        color='primary'
                        onClick={handleJoin}
                    >
                        Join with us
                    </JoinBtn>
                </Grid>
            </Grid>
        </Grid>
    )
}
// @ts-ignore
export default Index
