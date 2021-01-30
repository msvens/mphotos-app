import React, {useContext} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core"
import PhotosApi from "../common/api";
import {AuthContext} from "../MPhotosApp";

interface LogoutGuestDialog {

    open: boolean,
    onClose: () => void,
}

const LogoutGuestDialog: React.FC<LogoutGuestDialog>  = ({open, onClose}) => {

    const context = useContext(AuthContext)

    const handleLogout = () => {
        const logout = async () => {
            try {
                await PhotosApi.logoutGuest()
                context.checkGuest()
                onClose()
            } catch (error) {
                alert(error)
            }
        }
        logout()
    }

    return(
        <React.Fragment>
            <Dialog open={open}
                    onClose={onClose}
                    aria-labelledby="dialog-title">
            <DialogTitle id="dialog-title">Logout Mellowtech Photos Guest</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Logout as Guest. In order to login again you need to register with your
                        email
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleLogout} color="primary" autoFocus>
                            Logout
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default LogoutGuestDialog
