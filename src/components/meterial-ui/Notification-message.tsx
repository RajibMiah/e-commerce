import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {IconButton, makeStyles, Typography} from "@material-ui/core";
import {NotListedLocation} from "@material-ui/icons";
const useStyles= makeStyles((theme)=>({
    dialog :{
        padding: "16px",
        position: 'absolute',
        top: '2rem',
    },
    dialogContent:{
        textAlign:'center'
    },
    DialogActions:{
        padding:'17px',
        justifyContent:'center'
    },
    DialogTitle:{
        textAlign:'center'
    },
    titleIcon:{
        color:"#ff5b60",
        '&:hover':{
            cursor:'default'
        },
        '& .MuiSvgIcon-root':{
            fontSize:'6rem'
        }
    }
}))
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const classes = useStyles()
    const {  confirmDialog, setConfimDialog } = props
    const handleClose = () =>{
        setConfimDialog({
            ...confirmDialog,
            open:false,
            title:"",
            msg:''
        })
    }
    return (
        <Dialog open={confirmDialog.open}  classes = {{paper : classes.dialog}}>
            <DialogTitle className = {classes.DialogTitle}>
                <IconButton disableRipple className = {classes.titleIcon}>
                    <NotListedLocation/>
                </IconButton>
            </DialogTitle>
            <DialogContent className = {classes.dialogContent}>
                <Typography variant='h6'>{confirmDialog.msg}</Typography>
            </DialogContent>
            <DialogActions className = {classes.DialogActions}>
                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    color = 'primary'*/}
                {/*    style = {{color:'white'}}*/}
                {/*    onClick = {handleClose}*/}
                {/*>*/}
                {/*    Ok*/}
                {/*</Button>*/}
            </DialogActions>
        </Dialog>
    );
}
