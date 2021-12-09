import React, {useState} from 'react'
import {
    Button,
    Grid,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import MuiAlert from "components/meterial-ui/alert-message/MuiAlert";
import {useWallet} from "data/use-wallet";
import {LoaderBox} from "components/loader/loader.style";
import Loader from "components/loader/loader";
import {
    BalanceContainer, CurrentBalance,
    CurrentBalanceText,
} from "features/user-profile/Wallet/wallet.style";
import Router from "next/router";

interface Theme {
    palette: any,
    breakpoints: any
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
}))

const Wallet = () => {
    const classes = useStyles()
    const { loading , error, wallet: walletResult} = useWallet()
    if (loading) return <LoaderBox><Loader/></LoaderBox>;
    return (
        <Grid container className={classes.root}>
            <Grid container style={{padding: '7px'}}>
                <Grid item container>
                    <BalanceContainer>
                        <Grid item xs={12}>
                            <CurrentBalanceText>
                                Current Balance
                            </CurrentBalanceText>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={8} md={8}>
                                <CurrentBalance>
                                    {`TK. ${walletResult?.remaining_amount as string}`}
                                </CurrentBalance>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={4}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Button
                                    onClick={() => Router.push('/grocery')}
                                    color='primary'
                                    className={classes.orderNowBtn}
                                >
                                    Order Now
                                </Button>
                            </Grid>

                        </Grid>

                    </BalanceContainer>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Wallet