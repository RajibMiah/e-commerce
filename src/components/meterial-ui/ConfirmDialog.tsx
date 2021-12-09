import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NotListedLocation } from '@material-ui/icons'


const useStyle = makeStyles(theme =>({
    dialog :{
        padding: "16px",
        position: 'absolute',
        top: '2rem',
    },
    dialogContant:{
        textAlign:'center'
    },
    DialogActions:{
        justifyContent:'center'
    },
    DialogTitle:{
        textAlign:'center'
    },
    titleIcon:{
        //  backgroundColor:theme.palette.secondary.light,
        color:"#ff5b60",
        '&:hover':{
            //  backgroundColor:theme.palette.secondary.light,
            cursor:'default'
        },
        '& .MuiSvgIcon-root':{
            fontSize:'8rem'
        }
    }
}))

const ConfirmDialog = (props) => {
    const classes = useStyle()
    const {  confirmDialog, setConfimDialog } = props
    return (
        <Dialog open={confirmDialog.isOpen}  classes = {{paper : classes.dialog}}>
            <DialogTitle className = {classes.DialogTitle}>
                <IconButton disableRipple className = {classes.titleIcon}>
                    <NotListedLocation/>
                </IconButton>
            </DialogTitle>
            <DialogContent className = {classes.dialogContant}>
                <Typography variant='h6'>{confirmDialog.title}</Typography>
                <Typography variant='subtitle2'>{confirmDialog.subTitle}</Typography>
            </DialogContent>
            <DialogActions className = {classes.DialogActions}>
                <Button
                    variant="contained"
                    color = 'primary'
                    onClick = {()=>setConfimDialog({...confirmDialog, isOpen:false})}
                >
                    No
                </Button>
                <Button
                    variant="contained"
                    color = 'secondary'
                    onClick = {confirmDialog.onConfirm}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
