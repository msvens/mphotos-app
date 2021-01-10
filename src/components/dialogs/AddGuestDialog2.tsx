import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core"
import PhotosApi, {Guest} from "../../services/api";
import {AuthContext} from "../MPhotosApp";

interface AddGuestDialog2Props {

    open: boolean,
    update: boolean,
    email?: string,
    name?: string,
    onClose: (registered: boolean) => void,
}

const AddGuestDialog2: React.FC<AddGuestDialog2Props>  = ({open, update, email, name, onClose}) => {

    const [newEmail, setNewEmail] = useState<string>("")
    const [newName, setNewName] = useState<string>("")
    const [registered, setRegistered] = useState<Guest>()


    const context = useContext(AuthContext)


    useEffect(() => {
        if(email)
            setNewEmail(email)
        if(name)
            setNewName(name)
    }, [email, name])



    const handleRegister = () => {
        const register = async () => {
            try {
                var res: Guest
                if (update)
                    res = await PhotosApi.updateGuest(newName, newEmail)
                else
                    res = await PhotosApi.registerGuest(newName, newEmail)
                setRegistered(res)
            } catch (error) {
                if(email)
                    setNewEmail(email)
                if(name)
                    setNewName(name)
                alert(error)
            }
        }
        register()
    }

    const closeDialog = () => {
        if(registered) {
            context.checkGuest()
            onClose(true)
        }
        setRegistered(undefined)
        onClose(false)
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
                    onClose={closeDialog}
                    aria-labelledby="dialog-title">
            <DialogTitle id="dialog-title">Register/Update Mellowtech Photos Guest</DialogTitle>
                {registered === undefined &&
                <DialogContent>
                    <DialogContentText>
                        In order to be able to comment and like photos you need to register as a guest by providing
                        a nickname and your email address. To update your nickname you can simply register the same
                        email with a different name
                    </DialogContentText>
                    <TextField margin="dense" id="newName" label="Name" value={newName}
                               onChange={handleNameChange} fullWidth/>
                    <TextField margin="dense" id="newEmail" label="Email" value={newEmail}
                               onChange={handleEmailChange} fullWidth/>
                    <DialogActions>
                        <Button onClick={closeDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleRegister} color="primary" autoFocus>
                            {update ? 'Update' : 'Register'}
                        </Button>
                    </DialogActions>
                </DialogContent>
                }
                {registered &&
                <DialogContent>
                    <DialogContentText>
                        Thank you for registring {registered.name}. Dont forget to verify your email with
                        Mellowtech by clicking the link in the email we just sent to {registered.email}.
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={closeDialog} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </DialogContent>
                }
            </Dialog>
        </React.Fragment>
    );
};

export default AddGuestDialog2
