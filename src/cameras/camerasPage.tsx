import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React, {useContext, useEffect, useState} from "react";
import PhotosApi, {Camera, ColorScheme} from "../common/api";
import {fade, Grid, List, ListItem, ListItemText, ListSubheader, TextField} from "@material-ui/core";
import CameraDetail from "./CameraDetail";
import {useHistory, useParams} from "react-router";
import {MPContext} from "../App";
import EditIcon from '@material-ui/icons/Edit';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

import MPDialog from "../common/MPDialog";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import IconButton from "@material-ui/core/IconButton";
import EditPhoto from "../photos/EditPhoto";
import UpdateCameraDialog from "./UpdateCameraDialog";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            paddingLeft: 0,
            margin: 'auto',
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(2),
            maxWidth: 1024
        },
        editControls: {
            //margin: 'auto',
        },
        editButton: {
            //color: theme.palette.text.primary,
            //color: theme.palette.common.black,
            /*backgroundColor: fade(theme.palette.background.default, 0.5).toString(),
            '&:hover':
                {
                    backgroundColor: fade(theme.palette.background.default, 0.9).toString(),
                }*/
        },
    }),

)

export default function CamerasPage() {
    const {cameraId}= useParams()
    const classes = useStyles()
    const context = useContext(MPContext)
    const history = useHistory()
    const [cameras, setCameras] = useState<Camera[]>([])
    const [camera, setCamera] = useState<Camera>()
    const [showImageDialog, setShowImageDialog] = useState(false)
    const [showUpdateDialog, setShowUpdateDialog] = useState(false)
    const [url, setUrl] = useState("")


    useEffect(() => {
        PhotosApi.getCameras().then(c => {
            setCameras(c)
            if(cameraId) {
                let didSet = false
                for(var cc of c) {
                    if(cc.id === cameraId) {
                        setCamera(cc)
                        didSet = true
                        break
                    }
                }
                if(!didSet)
                    setCamera(c[0])
            } else {
                setCamera(c[0])
            }
        }).catch(err => alert(err))
    },[cameraId])


    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    }

    const onUpdateCamera = (u?: Camera) => {
        if(u) {
            PhotosApi.getCameras().then(c => {
                setCameras(c)
                for (var cc of c) {
                    if (cc.id === u.id) {
                        setCamera(cc)
                    }
                }
            })
        }
        setShowUpdateDialog(false)
    }

    const onUpdateUrl = () => {
        const update = async () => {
            try {
                if(camera) {
                    const res = await PhotosApi.updateCameraImage(camera.id, url)
                    const newCams = await PhotosApi.getCameras()
                    for(var cc of newCams) {
                        if(cc.id === camera.id)
                            setCamera(cc)
                    }
                    setCameras(newCams)

                }
            } catch (e) {
                alert(e)
            }
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={4} justify="space-between" alignContent="space-between">
                <Grid item>
                    <List subheader={<ListSubheader>Cameras</ListSubheader>}>
                        {cameras.length > 0 && cameras.map((c,idx) => (
                            <ListItem key={c.id} dense button
                                      onClick={() => {
                                          setCamera(c)
                                          history.push('/cameras/'+c.id)
                                      }} selected={c.id === (camera && camera.id)}>
                                <ListItemText>{c.model}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item>
                    {camera &&
                            <CameraDetail camera={camera} onUpdate={onUpdateCamera}>
                                {context.isUser &&
                                <div className={classes.editControls}>
                                    <IconButton aria-label="Edit Camera Image" color="inherit" onClick={() => setShowImageDialog(true)}
                                                className={classes.editButton}>
                                        <ImageOutlinedIcon fontSize={"small"}/>
                                    </IconButton>
                                    <IconButton aria-label="Edit Camera Spec" color="inherit" onClick={() => setShowUpdateDialog(true)}
                                                className={classes.editButton}>
                                        <EditIcon fontSize={"small"}/>
                                    </IconButton>
                                </div>
                                }
                            </CameraDetail>

                    }
                </Grid>
            </Grid>
            <MPDialog open={showImageDialog} closeOnOk={false} onClose={() => setShowImageDialog(false)} onOk={() => onUpdateUrl()} title={"Image URL"}
                      text={"Choose Image for this Camera"}>
                <TextField margin="dense" id="name" label="Url" value={url}
                           onChange={handleUrlChange} fullWidth/>
            </MPDialog>
            {context.isUser && camera &&
                <UpdateCameraDialog open={showUpdateDialog} onClose={onUpdateCamera}
                    camera={camera}/>
            }
        </div>
    )
}