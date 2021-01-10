import React from 'react';
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";

interface AlertDialogProps {
    open: boolean,
    onClose: () => void,
    message: string,
    title: string,
    closeText: string,
}

const AlertDialog: React.FC<AlertDialogProps> = (props: AlertDialogProps) => {
    return (
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary" autoFocus>
                        {props.closeText}
                    </Button>
                </DialogActions>
            </Dialog>
        );

}