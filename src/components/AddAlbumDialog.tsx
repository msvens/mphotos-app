import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";

interface AddAlbumProps {

    open: boolean,
    onClose: () => void,
    onSubmit: (name: string, description: string) => void,
}

const AddAlbumDialog: React.FC<AddAlbumProps>  = ({open, onClose, onSubmit}) => {

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const handleUpdate = () => {
        onClose()
        onSubmit(name, description)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    return(
        <React.Fragment>
            <Dialog open={open}
                    onClose={onClose}
                    aria-labelledby="dialog-title">
            <DialogTitle id="dialog-title">Add Album</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a new album. You will later have to add photos to it
                </DialogContentText>
                <TextField margin="dense" id="name" label="Name" value={name}
                           onChange={handleNameChange} fullWidth/>
                <TextField margin="dense" id="description" label="Description" value={description}
                           onChange={handleDescriptionChange} fullWidth multiline rows={4} />
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary" autoFocus>
                        Update Album
                    </Button>
                </DialogActions>
            </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default AddAlbumDialog;
