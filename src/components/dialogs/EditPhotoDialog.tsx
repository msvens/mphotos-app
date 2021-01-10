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
import PhotosApi, {Photo} from "../../services/api";

interface EditDialogProps {

    open: boolean,
    photo: Photo,
    onClose: () => void,
    onSubmit: (title: string, description: string, keywords: string, albums: string) => void,
}

const EditPhotoDialog: React.FC<EditDialogProps>  = ({open, photo, onClose, onSubmit}) => {

    const [title, setTitle] = useState<string>(photo.title);
    const [description, setDescription] = useState<string>(photo.description)
    const [keywords, setKeywords] = useState<string>(photo.keywords)
    const [albums, setAlbums] = useState<string>('')

    useEffect(() => {
        setTitle(photo.title);
        setDescription(photo.description);
        setKeywords(photo.keywords);
    }, [photo]);

    useEffect(() => {
        PhotosApi.getPhotoAlbums(photo.driveId)
            .then(res => setAlbums(res.join(',')))
    }, [photo]);

    const handleUpdate = () => {
        onClose()
        onSubmit(title, description, keywords, albums)
    }



    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleKeywordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeywords(event.target.value);
    };

    const handleAlbumsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlbums(event.target.value);
    };

    return(
        <React.Fragment>
            <Dialog open={open}
                    onClose={onClose}
                    aria-labelledby="dialog-title">
            <DialogTitle id="dialog-title">Edit Photo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Update title, description and text. Observe that keywords should be comma seprated
                </DialogContentText>
                <TextField margin="dense" id="title" label="Title" value={title}
                           onChange={handleTitleChange} fullWidth/>
                <TextField margin="dense" id="albums" label="Albums" value={albums}
                           onChange={handleAlbumsChange} fullWidth/>
                <TextField margin="dense" id="keywords" label="Keywords" value={keywords}
                           onChange={handleKeywordsChange} fullWidth/>
                <TextField margin="dense" id="description" label="Description" value={description}
                           onChange={handleDescriptionChange} fullWidth multiline rows={4} />
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary" autoFocus>
                        Save Photo
                    </Button>
                </DialogActions>
            </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default EditPhotoDialog;
