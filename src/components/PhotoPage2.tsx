import React, {useEffect, useState} from 'react';
import {makeStyles, createStyles, Theme, Grid, Typography, fade, Tooltip} from "@material-ui/core";
import {Photo} from "../types/photo";
import ImageGallery, {ReactImageGalleryItem} from 'react-image-gallery';

import PhotosApi from "../services/api";
import PhotoNav from "./PhotoNav";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import DeletePhotosDialog from "./DeletePhotosDialog";
import EditPhotoDialog from "./EditPhotoDialog";
import PhotoDetail from "./PhotoDetail";


interface PhotoProps2 {
    id: string,
    query?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            maxWidth: 1024,
            margin: 'auto'

        },
        img: {
            maxWidth: '100%',
            maxHeight: '100%',
            alignSelf: 'flex-start'
        },
        imgItem: {
            position: 'relative',
            margin: 'auto',
            display: 'flex',
            // maxHeigh: 800,
            // height: 800,
            maxWidth: 1080,
        },
        navButtons: {
            position: 'absolute',
            top: theme.spacing(2),
            right: theme.spacing(2),
        },
        editButtons: {
            position: 'absolute',
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
        editButton: {
            color: '#FFFFFF',
            backgroundColor: fade(theme.palette.grey.A700, 0.3).toString(),
            marginRight: theme.spacing(1),
            '&:hover': {
                backgroundColor: fade(theme.palette.grey.A700, 0.6).toString(),
            },
        },
        backButton: {
            position: 'absolute',
            top: '50%',
            left: theme.spacing(2),
            transform: 'translateY(-50%)',
            color: '#FFFFFF',
            backgroundColor: fade(theme.palette.grey.A700, 0.3).toString(),
            '&:hover': {
                backgroundColor: fade(theme.palette.grey.A700, 0.6).toString(),
            },
        },
        forwardButton: {
            position: 'absolute',
            top: '50%',
            right: theme.spacing(2),
            transform: 'translateY(-50%)',
            color: '#FFFFFF',
            backgroundColor: fade(theme.palette.grey.A700, 0.3).toString(),
            '&:hover': {
                backgroundColor: fade(theme.palette.grey.A700, 0.6).toString(),
            },
        },
    }),
);


const PhotoPage2: React.FC<PhotoProps2> = (props: PhotoProps2) => {

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [imgItems, setImgItems] = useState<ReactImageGalleryItem[]>([]);
    const [, updateState] = React.useState();
    const [idx, setIdx] = useState<number>(0);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const classes = useStyles();
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)

    useEffect(() => {
        PhotosApi.isLoggedIn().then(res => setLoggedIn(res))
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (props.query) {
                await PhotosApi.searchPhotos(props.query).then(res => {
                    if (res.photos) {
                        setIdx(0);
                        setImgItems(getImageCallery(res.photos));
                        setPhotos(res.photos);
                    }
                });
            } else {
                await PhotosApi.getPhotos(1000).then(res => {
                    if (res.photos) {
                        for (let i = 0; i < res.photos.length; i++) {
                            console.log(i);
                            if (res.photos[i].driveId === props.id) {
                                setIdx(i)
                            }
                        }
                        setImgItems(getImageCallery(res.photos));
                        setPhotos(res.photos);
                    }

                });
            }

        };
        fetchData();
    }, [props.id, props.query]);

    const getImageCallery = (ps: Photo[]): ReactImageGalleryItem[] => {
        return ps.map<ReactImageGalleryItem>(photo => {
            console.log({original: PhotosApi.getImageUrl(photo)});
            return {original: PhotosApi.getImageUrl(photo)};
        });
    }

    const handleForward = () => {
        let newIdx = idx + 1;
        if (newIdx >= photos.length)
            newIdx = 0;
        setIdx(newIdx);
    };

    const handleBackward = () => {
        let newIdx = idx - 1;
        if (newIdx < 0)
            newIdx = photos.length - 1;
        setIdx(newIdx);
    };

    const parseFilter = () => {
        var ret = ""
        if (props.query) {
            const parsed = new URLSearchParams(props.query);
            for (let entry of Array.from(parsed.entries())) {
                let key = entry[0];
                let value = entry[1];
                ret = ret + key + " = " + value
            }
            //return "Camera Model = "+parsed.get("cameraModel")
        }
        return ret
    }

    const setProfilePic = () => {
        PhotosApi.updateUserPic(photos[idx].fileName)
            .then(u => alert(u.pic))
            .catch(e => alert(e.toString()));
    };

    const handleCloseUpdate = () => {
        setShowUpdate(false)
    }

    const updatePhoto = (title: string, description: string, keywords: string) => {
        const driveId = photos[idx].driveId
        PhotosApi.updatePhoto(driveId, title, description, keywords)
            .then(p => {
                photos[idx] = p;

                updateState({})
            })
            .catch(e => alert(e.toString()))
    }

    const handleCancelDelete = () => {
        setShowDelete(false);
    };

    const deletePhoto = (removeFiles: boolean) => {
        const driveId = photos[idx].driveId
        PhotosApi.deletePhoto(driveId, removeFiles)
            .then(p => {
                var newPhotos = photos.filter(obj => obj.driveId !== driveId)
                setPhotos(newPhotos)
                if (idx >= newPhotos.length) {
                    setIdx(0)
                }
                alert(p.driveId + " was deleted")
            })
            .catch(e => alert(e.toString()))
    }

    return (
        <div className={classes.root}>

            {photos.length > 0 &&
            <Grid container alignItems="center" justify="space-around">
                {props.query &&
                <Grid item xs={12} justify="center">
                    <Typography variant="body2" align="center" color={'textSecondary'} gutterBottom>
                        Filter: {parseFilter()}
                    </Typography>
                </Grid>
                }
                <Grid item xs={12}>
                    <PhotoDetail photo={photos[idx]}/>
                </Grid>
                <Grid item xs={12} className={classes.imgItem} justify="center">
                    <div className={classes.imgItem}>
                        <img className={classes.img} alt={photos[idx].title} src={PhotosApi.getImageUrl(photos[idx])}/>
                        {loggedIn &&
                        <div className={classes.editButtons}>
                            <Tooltip title="Set Profile Picture">
                                <IconButton aria-label="Profile Picture" onClick={setProfilePic}
                                            className={classes.editButton}>
                                    <FaceIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                            <IconButton aria-label="Edit Photo" className={classes.editButton}
                                        onClick={() => setShowUpdate(true)}>
                                <EditIcon fontSize="small"/>
                            </IconButton>
                            <IconButton aria-label="Delete Photo" className={classes.editButton}
                                        onClick={() => setShowDelete(true)}>
                                <DeleteForeverIcon fontSize="small"/>
                            </IconButton>
                            <DeletePhotosDialog open={showDelete} onDelete={deletePhoto} onClose={handleCancelDelete}/>
                            <EditPhotoDialog open={showUpdate} photo={photos[idx]}
                                             onClose={handleCloseUpdate} onSubmit={updatePhoto}/>
                        </div>
                        }
                        <div className={classes.navButtons}>
                            <IconButton aria-label="previous" onClick={handleBackward} className={classes.editButton}>
                                <ArrowBackIosSharpIcon fontSize="small"/>
                            </IconButton>
                            <IconButton aria-label="next" color="primary" onClick={handleForward}
                                        className={classes.editButton}>
                                <ArrowForwardIosSharpIcon fontSize="small"/>
                            </IconButton>
                        </div>
                    </div>
                </Grid>
            </Grid>
            }
        </div>
    );
};

export default PhotoPage2