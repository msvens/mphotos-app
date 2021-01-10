import React, {useEffect} from "react";
import PhotosApi from "../services/api";
import {
    Button,
    Divider,
    TextField,
    Typography
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import DeletePhotosDialog from "./dialogs/DeletePhotosDialog";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            marginBottom: theme.spacing(6),
            marginTop: theme.spacing(2),
        },
    }),
);

const Drive: React.FC = () => {
    const [folder, setFolder] = React.useState('');
    const [id, setId] = React.useState('');
    const [openDelete, setOpenDelete] = React.useState(false);
    const classes = useStyles();
    const [authenticated, setAuthenticated] = React.useState(false)

    useEffect(() => {
        PhotosApi.isGoogleAuth()
            .then(a => setAuthenticated(a))
            .catch(e => alert(e.toString()))
    }, [])

    useEffect(() => {
        PhotosApi.getUser()
            .then(u => {
                if (u.driveFolderId)
                    setId(u.driveFolderId);
                if (u.driveFolderName)
                    setFolder(u.driveFolderName);
            })
            .catch(e => alert(e.toString()));
    }, [])

    const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFolder(event.target.value);
    };

    const handleSetFoler = async () => {
        PhotosApi.updateUserDrive(folder)
            .then(u => {
                if (u.driveFolderName)
                    setFolder(u.driveFolderName);
                if (u.driveFolderId)
                    setId(id)
            })
            .catch(err => alert(err.toString()))
    };

    const handleCheck = async () => {
        //e.preventDefault();
        PhotosApi.checkDrive()
            .then(res => alert("files to upload: " + res.length))
            .catch(err => alert(err.toString()))
    };

    const handleUpdate = async () => {
        PhotosApi.updatePhotos()
            .then(res => alert("uploaded " + res.length + " photos"))
            .catch(err => alert(err.toString()));
    };

    const handleCancelDelete = () => {
        setOpenDelete(false)
    }

    const handleDelete = (forever: boolean) => {
        PhotosApi.deletePhotos(forever)
            .then(photos => alert("deleted " + photos.length + " photos"))
            .catch(err => alert(err.toString()))
    };

    return (
        <div>
            <Typography variant="body1" paragraph={true}>
                Connected to Google: <strong>{String(authenticated)}</strong>
            </Typography>
            <Button variant="outlined" disabled={authenticated} href="/api/drive/auth">Connected to Google</Button>

            <Divider className={classes.divider}/>
            <Typography variant="body1" paragraph={true}>
                Set the new Google photo folder by changed the folder name. If you have multiple folders
                with the same name on your google drive the first returned will be picked
            </Typography>
            <TextField id="folderField" label="Folder Name" margin="normal" variant="outlined"
                       value={folder} onChange={handleFolderChange} fullWidth/>
            <Typography paragraph color="textSecondary">
                Drive Id: {id}
            </Typography>
            <Button variant="outlined" onClick={handleSetFoler}>Set Drive Folder</Button>

            <Divider className={classes.divider}/>
            <Typography variant="body1" paragraph={true}>
                Check for new photos on your google drive. This action will check if there any photos on your
                remote drive folder that has not you yet been uploaded
            </Typography>
            <Button variant="outlined" onClick={handleCheck}>Check Drive Folder</Button>

            <Divider className={classes.divider}/>
            <Typography variant="body1" paragraph={true}>
                Upload photos. This will download any photos from your google drive folder that are missing in
                the service.
            </Typography>
            <Button variant="outlined" onClick={handleUpdate}>Upload Photos</Button>

            <Divider className={classes.divider}/>
            <Typography variant="body1" paragraph={true}>
                <strong>Warning!</strong> this action removes all physical copies of your photos!
            </Typography>
            <Button variant="outlined" onClick={() => setOpenDelete(true)}>Delete All Photos</Button>

            <Divider className={classes.divider}/>
            <DeletePhotosDialog altTitle="Remove all photos from service?" open={openDelete} onDelete={handleDelete}
                                onClose={handleCancelDelete}/>
        </div>
    )
};

export default Drive