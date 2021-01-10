import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {Album} from "../../services/api";

interface EditAlbumProps {

    open: boolean,
    album: Album,
    onClose: () => void,
    onSubmit: (name: string, description: string, coverPic: string) => void,
    onDelete: (album: Album) => void,
}

const EditAlbumDialog: React.FC<EditAlbumProps>  = ({open, album, onDelete, onClose, onSubmit}) => {

    const [name, setName] = useState<string>(album.name);
    const [description, setDescription] = useState<string>(album.description)

    useEffect(() => {
        setName(album.name);
        setDescription(album.description);
    }, [album]);

    const handleUpdate = () => {
        onClose()
        onSubmit(name, description, album.coverPic)
    }

    const handleDelete = () => {
        onClose()
        onDelete(album)
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
            <DialogTitle id="dialog-title">Edit Album</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change name or description. Observe that clicking delete will remove this album from all photos
                </DialogContentText>
                <TextField margin="dense" id="name" label="Name" value={name}
                           onChange={handleNameChange} fullWidth/>
                <TextField margin="dense" id="description" label="Description" value={description}
                           onChange={handleDescriptionChange} fullWidth multiline rows={4} />
                <DialogActions>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete Album
                    </Button>
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

export default EditAlbumDialog;
