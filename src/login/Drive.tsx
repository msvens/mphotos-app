import React, {useEffect, useState} from "react";
import PhotosApi from "../common/api";
import {
    Button,
    Divider,
    TextField,
    Typography
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import DownloadDrivePhotosDialog from "./DownloadDrivePhotosDialog";
import MPDialog from "../common/MPDialog";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            marginBottom: theme.spacing(6),
            marginTop: theme.spacing(2),
        },
    }),
);

const Drive: React.FC = () => {
    const [folder, setFolder] = useState('')
    const [id, setId] = useState('')
    const [openDelete, setOpenDelete] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)
    const classes = useStyles()
    const [authenticated, setAuthenticated] = useState(false)


    useEffect(() => {
        PhotosApi.isGoogleAuth()
            .then(a => setAuthenticated(a))
            .catch(e => alert("error in auth: "+e.toString()))
    }, [])

    useEffect(() => {
        PhotosApi.getUser()
            .then(u => {
                if (u.driveFolderId)
                    setId(u.driveFolderId);
                if (u.driveFolderName)
                    setFolder(u.driveFolderName);
            })
            .catch(e => alert("error in user: "+e.toString()));
    }, [])



    const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFolder(event.target.value);
    };

    const handleSetFolder = async () => {
        PhotosApi.updateUserDrive(folder)
            .then(u => {
                if (u.driveFolderName)
                    setFolder(u.driveFolderName);
                if (u.driveFolderId)
                    setId(id)
            })
            .catch(err => alert("set folder: "+err.toString()))
    }

    const handleDelete = () => {
        const deletePhotos = async () => {
            try {
                const res = await PhotosApi.deletePhotos(true)
                alert("deleted " + res.length + " photos")
            } catch (error) {
                alert("could not delete photos: " + error)
            }
        }
        deletePhotos()
    }

    return (
        <div>
            <Typography variant="body1" paragraph={true}>
                Connected to Google: <strong>{String(authenticated)}</strong>
            </Typography>
            <Button variant="outlined" disabled={authenticated} href="/api/drive/auth">Connect to Google</Button>

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
            <Button variant="outlined" onClick={handleSetFolder}>Set Drive Folder</Button>

            <Divider className={classes.divider}/>
            <Typography variant="body1" paragraph={true}>
                Upload photos. This will download any photos from your google drive folder that are missing in
                the service.
            </Typography>
            <Button variant="outlined" onClick={() => setOpenDownload(true)}>Upload Photos</Button>

            <Divider className={classes.divider}/>
            <Typography variant="body1" paragraph={true}>
                <strong>Warning!</strong> this action removes all physical copies of your photos!
            </Typography>
            <Button variant="outlined" onClick={() => setOpenDelete(true)}>Delete All Photos</Button>

            <Divider className={classes.divider}/>


           <MPDialog open={openDelete}
                      onClose={() => setOpenDelete(false)}
                      onOk={handleDelete}
                      title={"Delete all Photos?"}
                      text="By removing photos all image data will be removed from the server"/>

            <DownloadDrivePhotosDialog open={openDownload} onClose={() => setOpenDownload(false)}/>

        </div>
    )
};

export default Drive