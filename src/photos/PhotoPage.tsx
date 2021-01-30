import React, {useContext, useEffect, useState} from 'react';
import {
    createStyles,
    fade,
    Grid,
    makeStyles,
    Theme,
    Tooltip,
    Typography,
    useMediaQuery,
} from "@material-ui/core";

import PhotosApi, {Album, Photo, PhotoList, PhotoType} from "../common/api";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import FaceIcon from '@material-ui/icons/Face';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import FullScreenPhoto from "./FullScreenPhoto";
import PhotoDetail2 from "./PhotoDetail2";
import {AuthContext} from "../MPhotosApp";
import MPDialog from "../common/MPDialog";
import EditPhoto from "./EditPhoto";


type PhotoPageProps = {
    photoType: PhotoType
    id?: string
    query?: string
    albumId?: number
}

type EditButtonProps = {
    tooltip: string,
    onClick: () => void,
}

type TouchState = {
    xStart: number,
    xPos: number,
    yStart: number,
    yPos: number
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            maxWidth: 1200,
            margin: 'auto',
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
            maxWidth: 1200,
            marginTop: theme.spacing(1),
        },
        topRight: {
            position: 'absolute',
            top: theme.spacing(2),
            right: theme.spacing(2),
        },
        middleLeft: {
            position: 'absolute',
            //top: theme.spacing(2),
            top: '50%',
            left: theme.spacing(2),
        },
        middleRight: {
            position: 'absolute',
            top: '50%',
            right: theme.spacing(2),
        },
        editButtons: {
            position: 'absolute',
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
        editButton: {
            color: '#FFFFFF',
            backgroundColor: fade(theme.palette.common.black, 0.7).toString(),
            marginRight: theme.spacing(1),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.black, 0.9).toString(),
            },
        },
    }),
)

const PhotoPage: React.FC<PhotoPageProps> = ({photoType, id, query, albumId}) => {

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [album, setAlbum] = useState<Album>();
    const [, updateState] = React.useState();
    const [idx, setIdx] = useState<number>(0);
    const classes = useStyles();
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showFullscreen, setShowFullscreen] = useState(false)
    const touch: TouchState = {xStart: -1, xPos: -1, yStart: -1, yPos: -1}
    const isPortrait = useMediaQuery('(orientation: portrait)')
    const context = useContext(AuthContext)

    useEffect(() => {

        const updatePhotos = (pl: PhotoList) => {
            if (pl.photos) {
                if (id) {
                    for (let i = 0; i < pl.length; i++) {
                        if (pl.photos[i].driveId === id) {
                            setIdx(i)
                        }
                    }
                }
                setPhotos(pl.photos)
            }
        }

        const fetchData = async () => {
            if (query) {
                await PhotosApi.searchPhotos(query).then(res => {
                    updatePhotos(res)
                });
            } else if (albumId) {
                await PhotosApi.getAlbum(albumId).then(res => {
                    setAlbum(res.info)
                    updatePhotos(res.photos)
                });
            } else {
                await PhotosApi.getPhotos(1000).then(res => {
                    updatePhotos(res)
                });
            }

        };
        fetchData();
    }, [id, query, albumId]);

    const handleForward = () => {
        let newIdx = idx + 1
        if (newIdx >= photos.length)
            newIdx = 0
        setIdx(newIdx)
        window.history.pushState({}, '', '/photo/' + photos[newIdx].driveId)
    }

    const handleBackward = () => {
        let newIdx = idx - 1;
        if (newIdx < 0)
            newIdx = photos.length - 1;
        setIdx(newIdx);
        window.history.pushState({}, '', '/photo/' + photos[newIdx].driveId)
    }

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
        if (album) {
            PhotosApi.updateAlbum({
                id: album.id,
                name: album.name,
                description: album.description,
                coverPic: photos[idx].fileName
            }).catch(e => alert(e.toString()));
        } else {
            PhotosApi.updateUserPic(photos[idx].fileName)
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

    const handleCloseUpdate = (p?: Photo) => {
        if (p) {
            const newList = photos.map((photo) => {
                if (photo.driveId === p.driveId) {
                    return p
                } else
                    return photo
            })
            setPhotos(newList)
        }
        setShowUpdate(false)
    }

    const deletePhoto = () => {
        const driveId = photos[idx].driveId
        PhotosApi.deletePhoto(driveId, true)
            .then(p => {
                var newPhotos = photos.filter(obj => obj.driveId !== driveId)
                setPhotos(newPhotos)
                if (idx >= newPhotos.length) {
                    setIdx(0)
                }
            })
            .catch(e => alert(e.toString()))
    }

    const EditButton: React.FC<EditButtonProps> = ({tooltip, onClick, children}) => {
        return (
                <Tooltip title={tooltip}>
                    <IconButton aria-label={tooltip} onClick={onClick}
                                className={classes.editButton}>
                        {children}
                    </IconButton>
                </Tooltip>

        )
    }

    const onStartTouch = (event: React.TouchEvent<HTMLDivElement>) => {
        if (showFullscreen || (event.touches && event.touches.length > 1)) return

        touch.xStart = event.touches[0].clientX
        touch.yStart = event.touches[0].clientY
        touch.xPos = touch.xStart
        touch.yPos = touch.yStart

    }

    const onMoveTouch = (event: React.TouchEvent<HTMLDivElement>) => {
        if (showFullscreen || (event.touches && event.touches.length > 1)) return
        touch.xPos = event.touches[0].clientX;
        touch.yPos = event.touches[0].clientY;

    };

    const onEndTouch = (event: React.TouchEvent<HTMLDivElement>) => {
        if (showFullscreen || (event.touches && event.touches.length > 1)) return

        const deltaX = touch.xStart - touch.xPos
        const deltaY = touch.yStart - touch.yPos
        touch.xStart = touch.yStart = touch.xPos = touch.yPos = -1

        if (Math.abs(deltaX) > 30 && Math.abs(deltaY) < 40)
            deltaX < 0 ? handleBackward() : handleForward();
    };

    const ProfilePicture: React.FC = () => {
        if (album) {
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

    const renderDeletePhotoDialog = (
        <MPDialog open={showDelete}
                  onClose={() => setShowDelete(false)}
                  onOk={deletePhoto}
                  title={"Delete Photo?"}
                  text="By removing the photo all associated image data will be deleted"/>
    )


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
                <Grid item xs={12} className={classes.imgItem}>
                    <div className={classes.imgItem}
                         onTouchEnd={onEndTouch}
                         onTouchStart={onStartTouch}
                         onTouchMove={onMoveTouch}>

                        <FullScreenPhoto photo={photos[idx]} openDialog={showFullscreen}
                                         onClose={() => setShowFullscreen(false)} onNext={handleForward}
                                         onPrev={handleBackward}/>
                        <div>
                            <img className={classes.img} alt={photos[idx].title}
                                 src={PhotosApi.getImageUrl(photos[idx], photoType, isPortrait)}/>
                        </div>

                        {context.isUser &&
                        <>
                            {renderDeletePhotoDialog}
                            <EditPhoto open={showUpdate} photo={photos[idx]} onClose={handleCloseUpdate}/>
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
                        </>
                        }
                        <div className={classes.topRight}>
                            <IconButton aria-label="previous" onClick={handleBackward} className={classes.editButton}>
                                <ArrowBackIosSharpIcon fontSize="small"/>
                            </IconButton>
                            <IconButton aria-label="next" color="primary" onClick={handleForward}
                                        className={classes.editButton}>
                                <ArrowForwardIosSharpIcon fontSize="small"/>
                            </IconButton>
                            <IconButton aria-label="fullScreen" color="primary" onClick={() => setShowFullscreen(true)}
                                        className={classes.editButton}>
                                <FullscreenIcon fontSize="small"/>
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <PhotoDetail2 photo={photos[idx]}/>
                </Grid>
            </Grid>
            }
        </div>
    );
};

export default PhotoPage