import React from "react";
import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const AlertMessage: React.FC<any> = (props) => {
    const {open, setOpen} = props;

    return (
        <div>
            <Snackbar open={open.isOpen} autoHideDuration={2000}>
                <Alert
                    severity={open.type}
                    onClose={(event, reason) => setOpen({
                        ...open,
                        isOpen:false
                    })}
                >
                    {open.msg}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AlertMessage;