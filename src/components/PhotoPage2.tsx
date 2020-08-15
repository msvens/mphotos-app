import React, {useEffect, useState, Fragment} from 'react';
import {makeStyles, createStyles, Theme, Grid, Typography, fade, Tooltip} from "@material-ui/core";

import PhotosApi, {Album, PhotoList} from "../services/api";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import FaceIcon from '@material-ui/icons/Face';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import DeletePhotosDialog from "./DeletePhotosDialog";
import EditPhotoDialog from "./EditPhotoDialog";
import PhotoDetail from "./PhotoDetail";
import {Photo} from "../types/photo";


interface PhotoProps2 {
    id?: string,
    query?: string
    albumName?: string
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
        // Keeping this layout for future reference:
        // backButton: {
        //     position: 'absolute',
        //     top: '50%',
        //     left: theme.spacing(2),
        //     transform: 'translateY(-50%)',
        //     color: '#FFFFFF',
        //     backgroundColor: fade(theme.palette.grey.A700, 0.3).toString(),
        //     '&:hover': {
        //         backgroundColor: fade(theme.palette.grey.A700, 0.6).toString(),
        //     },
        // },
    }),
);

type EditButtonProps = {
    tooltip: string,
    onClick: () => void,

}

const PhotoPage2: React.FC<PhotoProps2> = ({id, query, albumName}) => {

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [album, setAlbum] = useState<Album>();
    const [, updateState] = React.useState();
    const [idx, setIdx] = useState<number>(0);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const classes = useStyles();
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [xpos, setXPos] = useState<number>(-1)

    useEffect(() => {
        PhotosApi.isLoggedIn().then(res => setLoggedIn(res))
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                await PhotosApi.searchPhotos(query).then(res => {
                    updatePhotos(res)
                });
            } else if (albumName) {
                await PhotosApi.getAlbum(albumName).then(res => {
                    setAlbum(res.info)
                    updatePhotos(res.photos)
                });
            }
            else {
                await PhotosApi.getPhotos(1000).then(res => {
                    updatePhotos(res)
                });
            }

        };
        fetchData();
    }, [id, query, albumName]);

    const updatePhotos = (pl: PhotoList) => {
        if(pl.photos) {
            if(id) {
                for (let i = 0; i < pl.length; i++) {
                    if(pl.photos[i].driveId === id) {
                        setIdx(i)
                    }
                }
            }
            setPhotos(pl.photos)
        }
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
        if (query) {
            const parsed = new URLSearchParams(query);
            for (let entry of Array.from(parsed.entries())) {
                let key = entry[0];
                let value = entry[1];
                ret = ret + key + " = " + value
            }
        }
        return ret
    }

    const setProfilePic = () => {
        if(album) {
            PhotosApi.updateAlbum(album.description, photos[idx].fileName, album.name)
                .then(a => alert(a.coverPic))
                .catch(e => alert(e.toString()));
        } else {
            PhotosApi.updateUserPic(photos[idx].fileName)
                .then(u => alert(u.pic))
                .catch(e => alert(e.toString()));
        }
    };

    const togglePrivate = () => {
        const driveId = photos[idx].driveId
        PhotosApi.togglePrivate(driveId)
            .then(p => {
                photos[idx] = p;
                updateState({});
            })
            .catch(e => alert(e.toString()));
    }

    const handleCloseUpdate = () => {
        setShowUpdate(false)
    }

    const updatePhoto = (title: string, description: string, keywords: string, albums: string) => {
        const driveId = photos[idx].driveId
        PhotosApi.updatePhoto(driveId, title, description, keywords, albums)
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

    const EditButton: React.FC<EditButtonProps> = ({tooltip, onClick, children}) => {
        return (
            <Fragment>
                <Tooltip title={tooltip}>
                    <IconButton aria-label={tooltip} onClick={onClick}
                                className={classes.editButton}>
                        {children}
                    </IconButton>
                </Tooltip>
            </Fragment>
        );
    }

    const enterDrag = (event: React.DragEvent<HTMLDivElement>) => {
        setXPos(event.clientX)
    }

    const startTouch = (event: React.TouchEvent<HTMLDivElement>) => {
        setXPos(event.touches[0].clientX)
        console.log("touch")
    }

    const leaveTouch = (event: React.TouchEvent<HTMLDivElement>) => {
        const delta = xpos - event.touches[0].clientX
        setXPos(-1)
        if(Math.abs(delta) > 20) {
            if (delta < 0) {
                handleBackward()
            } else {
                handleForward()
            }
        }
    }


    const leaveDrag = (event: React.DragEvent<HTMLDivElement>) => {
        const delta = xpos - event.clientX
        setXPos(-1)
        if(Math.abs(delta) > 20) {
            if (delta < 0) {
                handleBackward()
            } else {
                handleForward()
            }
        }
    }

    const ProfilePicture: React.FC = () => {
        if(album) {
            return (
                <EditButton tooltip="Set Album Cover" onClick={setProfilePic}>
                    <PhotoAlbumIcon fontSize="small"/>
                </EditButton>
            );
        } else {
            return (<EditButton tooltip="Set Profile Picture" onClick={setProfilePic}>
                <FaceIcon fontSize="small"/>
            </EditButton>);
        }
    }

    return (
        <div className={classes.root}>

            {photos.length > 0 &&
            <Grid container alignItems="center" justify="space-around">
                {query &&
                <Grid item xs={12} justify="center">
                    <Typography variant="body2" align="center" color={'textSecondary'} gutterBottom>
                        Filter: {parseFilter()}
                    </Typography>
                </Grid>
                }
                <Grid item xs={12}>
                    <PhotoDetail photo={photos[idx]}/>
                </Grid>
                <Grid item xs={12} className={classes.imgItem}>
                    <div className={classes.imgItem}
                         onTouchEnd={leaveTouch}
                         onTouchStart={startTouch}
                         onDragEnter={enterDrag}
                         onDragLeave={leaveDrag}>
                        <DeletePhotosDialog open={showDelete} onDelete={deletePhoto} onClose={handleCancelDelete}/>
                        <EditPhotoDialog open={showUpdate} photo={photos[idx]}
                                         onClose={handleCloseUpdate} onSubmit={updatePhoto}/>
                             <div>
                             <img className={classes.img} alt={photos[idx].title} src={PhotosApi.getImageUrl(photos[idx])}/>
                             </div>

                        {loggedIn &&
                        <div className={classes.editButtons}>
                            <ProfilePicture/>
                            {photos[idx].private
                                ? <EditButton tooltip="Set Public Photo" onClick={togglePrivate}>
                                    <LockIcon fontSize="small"/>
                                </EditButton>
                                : <EditButton tooltip="Set Private Photo" onClick={togglePrivate}>
                                    <LockOpenIcon fontSize="small"/>
                                </EditButton>
                            }
                            <EditButton tooltip="Edit Photo Description" onClick={() => setShowUpdate(true)}>
                                <EditIcon fontSize="small"/>
                            </EditButton>
                            <EditButton tooltip="Delete Photo" onClick={() => setShowDelete(true)}>
                                <DeleteForeverIcon fontSize="small"/>
                            </EditButton>
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