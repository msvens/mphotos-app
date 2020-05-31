import React, {useEffect} from "react";
import PhotosApi from "../services/api";
import {
    Button,
    Divider,
    TextField,
    Typography
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import DeletePhotosDialog from "./DeletePhotosDialog";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider:  {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(2),
        },
    }),
);

const Drive: React.FC = () => {
    const [folder, setFolder] = React.useState('');
    const [id, setId] = React.useState('');
    const [openDelete, setOpenDelete] = React.useState(false);
    const classes = useStyles();

    useEffect(() => {
        PhotosApi.getUser()
            .then(u => {
                if(u.driveFolderId)
                    setId(u.driveFolderId);
                if(u.driveFolderName)
                    setFolder(u.driveFolderName);
            })
            .catch(e => alert(e.toString()));
    },[]);

    const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFolder(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>  {
        e.preventDefault();
        PhotosApi.updateUserDrive(folder)
            .then(u => {
                if(u.driveFolderName)
                    setFolder(u.driveFolderName);
                if(u.driveFolderId)
                    setId(id)
            })
            .catch(err => alert(err.toString()))
    };

    const handleCheck = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        PhotosApi.checkDrive()
            .then(res => alert("files to upload: "+res.length))
            .catch(err => alert(err.toString()))
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        PhotosApi.updatePhotos()
            .then(res => alert("uploaded "+res.length+" photos"))
            .catch(err => alert(err.toString()));
    };

    const handleCancelDelete = () => {setOpenDelete(false)}

    const handleDelete = (forever:  boolean) => {
        PhotosApi.deletePhotos(forever)
            .then(photos => alert("deleted "+photos.length+" photos"))
            .catch(err => alert(err.toString()))
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField id="folderField" label="Folder Name" margin="normal" variant="outlined"
                           value={folder} onChange={handleFolderChange} fullWidth
                />
                <Typography paragraph color="textSecondary">
                    Drive Id: {id}
                </Typography>
                <Button variant="outlined" type="submit">Set Drive Folder</Button>
            </form>
            <Divider className={classes.divider}/>
            <Typography variant="body1" paragraph={true}>
                Check for new photos on your google drive. This action will check if there any photos on your
                remote drive folder that has not you yet been uploaded
            </Typography>
            <form onSubmit={handleCheck}>
                <Button variant="outlined" type="submit">Check Drive Folder</Button>
            </form>
            <Divider className={classes.divider}/>
            <Typography variant="body1" paragraph={true}>
                Upload photos. This will download any photos from your google drive folder that are missing in
                the service.
            </Typography>
            <form onSubmit={handleUpdate}>
                <Button variant="outlined" type="submit">Upload Photos</Button>
            </form>
            <Divider className={classes.divider}/>
            <Typography variant="body1" paragraph={true}>
                <strong>Warning!</strong> this action removes all physical copies of your photos!
            </Typography>
            <Button variant="outlined" onClick={() => setOpenDelete(true)}>Delete All Photos</Button>
            <Divider className={classes.divider}/>
            <DeletePhotosDialog altTitle="Remove all photos from service?" open={openDelete} onDelete={handleDelete} onClose={handleCancelDelete}/>
        </div>
    )
};

export default Drive