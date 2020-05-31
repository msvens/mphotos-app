import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

interface DialogProps {

    open: boolean,
    altTitle?: string
    onDelete: (removeFiles: boolean) => void
    onClose: () => void,

}

const DeletePhotosDialog: React.FC<DialogProps>  = (props: DialogProps) => {



    const handleDelete = (forever: boolean) => {
        props.onClose();
        props.onDelete(forever)
    };

    return(
        <React.Fragment>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.altTitle ? props.altTitle : 'Remove photo from service?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By removing photos they no longer show up in your feed. If you
                        choose to Delete Forever the associated images files will also be deleted
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={() => handleDelete(false)} color="primary">
                        Delete
                    </Button>
                    <Button onClick={() => handleDelete(true)} color="primary">
                        Delete Forever
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeletePhotosDialog