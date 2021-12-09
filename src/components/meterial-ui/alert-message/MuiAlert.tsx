import React, {useEffect} from "react";
import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const AlertIndex: React.FC<any> = (props) => {
    const {showAlert, setOpen} = props;
    // console.log(setOpen)
    const handleClose = (event , reason) =>{
        if(reason === 'clickway'){
            return
        }
        showAlert.isOpen = false
        setOpen({
            ...showAlert,
            isOpen:false
        })
    }

    return (
        <div>
            <Snackbar open={showAlert.isOpen} autoHideDuration={4000} onClose = {handleClose}>
                <Alert
                    severity={showAlert.type}
                    onClose={(event, reason) => setOpen(false)}
                >
                    {showAlert.msg}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AlertIndex;