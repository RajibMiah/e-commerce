import React from 'react'
import {Grid, Typography} from "@material-ui/core";
import {Button} from "../button/button";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(theme=>({
    root:{

    },
    title:{
        display:"flex",
        justifyContent:'center',
        padding:'13px',
    },
    msgText:{
        display:"flex",
        justifyContent:'center',
        padding:'13px',
        textAlign:'center'
    },
    btn:{
        display:"flex",
        justifyContent:'center',
        padding:'13px'
    }
}))

const ReferSuccessPopup = () =>{
    const classes = useStyles()
    return(
       <Grid container style = {{padding:'2rem'}}>
           <Grid item xs = {12}>
               <Typography
                 className = {classes.title}
                 variant = 'body1'
                 style = {{
                    fontWeight:"bold"
                 }}
               >
                   You Earned TK. 100
               </Typography>
           </Grid>
           <Grid item xs = {12}>
               <Typography
                   variant = 'subtitle2'
                   className = {classes.msgText}
               >
                   One of your friends accepted your referral code and order us. You earned TK. 100 for rewards!
               </Typography>
           </Grid>
           <Grid item xs = {12} className = {classes.btn}>
               <Button
                   variant = 'contained'
                   color = 'primary'
                   style = {{width:"50%"}}
               >
                 Reefer more
               </Button>
           </Grid>
       </Grid>
    )
}
export default  ReferSuccessPopup