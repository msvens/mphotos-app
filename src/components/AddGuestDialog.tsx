import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core"

interface AddGuestDialogProps {

    open: boolean,
    email?: string,
    name?: string,
    onClose: () => void,
    onSubmit: (name: string, email: string) => void,
}

const AddGuestDialog: React.FC<AddGuestDialogProps>  = ({open, email, name, onClose, onSubmit}) => {

    const [newEmail, setNewEmail] = useState<string>("")
    const [newName, setNewName] = useState<string>("")


    useEffect(() => {
        if(email)
            setNewEmail(email)
        if(name)
            setNewName(name)
    }, [email, name])



    const handleUpdate = () => {
        onClose()
        onSubmit(newName, newEmail)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(event.target.value);
    }

    return(
        <React.Fragment>
            <Dialog open={open}
                    onClose={onClose}
                    aria-labelledby="dialog-title">
            <DialogTitle id="dialog-title">Register Mellowtech Photos Guest</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    In order to be able to comment and like photos you need to register as a guest by providing
                    a nickname and your email address. You will get at a verification email sent to your provided
                    email.
                </DialogContentText>
                <TextField margin="dense" id="newName" label="Name" value={newName}
                           onChange={handleNameChange} fullWidth/>
                <TextField margin="dense" id="newEmail" label="Email" value={newEmail}
                           onChange={handleEmailChange} fullWidth/>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary" autoFocus>
                        Register
                    </Button>
                </DialogActions>
            </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default AddGuestDialog
