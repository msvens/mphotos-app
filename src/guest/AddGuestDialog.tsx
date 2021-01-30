import React, {useContext, useEffect, useState} from 'react'
import MPDialog, {BaseDialog} from "../common/MPDialog";
import PhotosApi, {Guest} from "../common/api";
import {AuthContext} from "../MPhotosApp";
import {TextField} from "@material-ui/core";

type AddGuestDialogProps = BaseDialog & {

    update: boolean,
    email?: string,
    name?: string,

}

const AddGuestDialog: React.FC<AddGuestDialogProps> = ({open, onClose, update, email, name}) => {

    const [newEmail, setNewEmail] = useState<string>("")
    const [newName, setNewName] = useState<string>("")
    const [registered, setRegistered] = useState<Guest>()
    const context = useContext(AuthContext)

    useEffect(() => {
        if (email) setNewEmail(email)
        if (name) setNewName(name)
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
                if (email)
                    setNewEmail(email)
                if (name)
                    setNewName(name)
                alert(error)
            }
        }
        register()
    }

    const handleOnClose = () => {
        if (registered) {
            context.checkGuest()
        }
        onClose()
        setRegistered(undefined)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(event.target.value);
    }

    const regText = `In order to be able to comment and like photos you need to register as a guest by providing
    a nickname and your email address. To update your nickname you can simply register the same
    email with a different name`

    function didReg() {
        return `Thank you for registring ${registered!.name}. Dont forget to verify your email with
        Mellowtech by clicking the link in the email we just sent to ${registered!.email}.`
    }

    if (registered === undefined)
        return (
            <MPDialog title={update ? "Update User" : "Register User"} text={regText}
                      open={open} onClose={handleOnClose} onOk={handleRegister} closeOnOk={false}>
                    <TextField margin="dense" id="newName" label="Name" value={newName}
                               onChange={handleNameChange} fullWidth/>
                    <TextField margin="dense" id="newEmail" label="Email" value={newEmail}
                               onChange={handleEmailChange} fullWidth/>
            </MPDialog>
        )
    else
        return (
            <MPDialog text={didReg()} open={open} onClose={handleOnClose} closeText={"Ok"}/>
        )
}

export default AddGuestDialog