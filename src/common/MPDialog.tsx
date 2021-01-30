import React from 'react'
import PhotosApi from "../common/api"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

export type BaseDialog = {
    open: boolean,
    onClose: () => void
}

type MPDialogProps = BaseDialog & {
    title?: string,
    text?: string,
    onOk?: () => void,
    closeText?: string,
    okText?: string,
    describedBy?: string,
    closeOnOk?: boolean
}

const MPDialog: React.FC<MPDialogProps> = ({
                                               title,
                                               text,
                                               open,
                                               onClose,
                                               onOk,
                                               closeText,
                                               okText,
                                               describedBy,
                                               closeOnOk,
                                               children
                                           }) => {

    const dialogTitle = "mpdialog-title-" + PhotosApi.nextId()
    const dialogText = "mpdialog-text-" + PhotosApi.nextId()

    const handleOk = () => {
        if (onOk) {
            onOk()
        }
        if (closeOnOk) {
            onClose()
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby={title ? dialogTitle : undefined}
            aria-describedby={text ? dialogText : describedBy}

            fullWidth maxWidth='md'>

            {title &&
            <DialogTitle id={dialogTitle}>{title}</DialogTitle>
            }
            <DialogContent>
                {text &&
                <DialogContentText id={dialogText}>
                    {text}
                </DialogContentText>
                }
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">{closeText}</Button>
                {onOk &&
                <Button onClick={handleOk} color="primary" autoFocus>{okText}</Button>
                }
            </DialogActions>
        </Dialog>
    )
}

MPDialog.defaultProps = {
    closeText: "Cancel",
    okText: "Ok",
    closeOnOk: true

} as Partial<MPDialogProps>

export default MPDialog