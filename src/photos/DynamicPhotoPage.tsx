import React, {useContext, useEffect, useState} from 'react';
import {createStyles, Grid, makeStyles, Theme, useMediaQuery, useTheme} from "@material-ui/core";
import PhotoDetail2 from "./PhotoDetail2";
import {MPContext} from "../App";
import PhotosApi, {Album, ColorScheme, colorScheme, Photo, PhotoList, PhotoType} from "../common/api";
import PhotoControls from "./PhotoControls";
import MPDialog from "../common/MPDialog";
import EditPhoto from "./EditPhoto";
import FullScreenPhoto from "./FullScreenPhoto";

type DynamicPhotoPageProps = {
    id?: string
    query?: string
    albumId?: number
}

type TouchState = {
    xStart: number,
    xPos: number,
    yStart: number,
    yPos: number
}

const useStyles = makeStyles<Theme,ColorScheme>((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            margin: 'auto',
            paddingBottom: theme.spacing(2),
        },
        photoDetail: {
            paddingTop: theme.spacing(1),
            margin: 'auto',
            maxWidth: 1024,
        },
        photoDetailBorders: {
            paddingTop: theme.spacing(1),
            margin: 'auto',
            maxWidth: 1024,
            paddingLeft: theme.spacing(7),
            paddingRight: theme.spacing(7),

        },
        imgCanvas: {
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            maxheight: '85vh',
            backgroundColor: (props: ColorScheme) => props.backgroundColor,
        },
        imgCanvasSmall: {
            backgroundColor: (props: ColorScheme) => props.backgroundColor,
            position: 'relative',
            margin: 'auto',
            display: 'flex',
        },
        imgSmall: {
            maxWidth: '100%',
            maxHeight: '100%',
            alignSelf: 'flex-start'
        },
        img: {
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
        },
        imgLeftRight: {
            paddingLeft: theme.spacing(7),
            paddingRight: theme.spacing(7),
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
        },
        imgAll: {
            paddingLeft: theme.spacing(7),
            paddingRight: theme.spacing(7),
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
        },
    })
)

const DynamicPhotoPage: React.FC<DynamicPhotoPageProps> = ({id, query, albumId}) => {

    const context = useContext(MPContext)

    const classes = useStyles(colorScheme(context.uxConfig.photoBackgroundColor))
    const theme = useTheme()

    const [photos, setPhotos] = useState<Photo[]>([])
    const [album, setAlbum] = useState<Album>()
    const [idx, setIdx] = useState<number>(0)
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showFullscreen, setShowFullscreen] = useState(false)
    const touch: TouchState = {xStart: -1, xPos: -1, yStart: -1, yPos: -1}

    const isPortrait = useMediaQuery('(orientation: portrait)')
    const isLargeDisplay = useMediaQuery(theme.breakpoints.up('sm'))

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
    }, [id, query, albumId])

    const hasBorders = () => {
        return isLargeDisplay && (context.uxConfig.photoBorders !== "none")
    }

    const getImageCanvasClass = () => {
        return isLargeDisplay ? classes.imgCanvas : classes.imgCanvasSmall
    }

    const getImageClass = () => {
        if(isLargeDisplay) {
            if(context.uxConfig.photoBorders === "none") {
                return classes.img
            }
            else if(context.uxConfig.photoBorders === "left-right")
                return classes.imgLeftRight
            else
                return classes.imgAll
        } else {
            return classes.imgSmall
        }
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

    const handleBackward = () => {
        let newIdx = idx - 1;
        if (newIdx < 0)
            newIdx = photos.length - 1;
        setIdx(newIdx);
        window.history.pushState({}, '', '/photo/' + photos[newIdx].driveId)
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

    const handleForward = () => {
        let newIdx = idx + 1
        if (newIdx >= photos.length)
            newIdx = 0
        setIdx(newIdx)
        window.history.pushState({}, '', '/photo/' + photos[newIdx].driveId)
    }

    const handlePrivate = () => {
        const driveId = photos[idx].driveId
        PhotosApi.togglePrivate(driveId)
            .then(p => {
                const newPhotos = photos.map((pp) => {
                    if (pp.driveId === p.driveId)
                        return p
                    else
                        return pp
                })
                setPhotos(newPhotos)
            })
            .catch(e => alert(e.toString()));
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


    return (
        <div className={classes.root}>
            {photos.length > 0 &&
            <>
                <Grid container alignItems="center" justify="space-around">
                    <Grid item xs={12} style={{backgroundColor: context.uxConfig.photoBackgroundColor}} className={getImageCanvasClass()}
                          onTouchEnd={onEndTouch}
                          onTouchStart={onStartTouch}
                          onTouchMove={onMoveTouch}>
                        <PhotoControls photoBackground={context.uxConfig.photoBackgroundColor} onBackward={handleBackward}
                                       onForward={handleForward}
                                       onFullScreen={() => setShowFullscreen(true)}
                                       onPrivate={handlePrivate}
                                       onDelete={() => setShowDelete(true)}
                                       onEdit={() => setShowUpdate(true)}
                                       onProfilePic={() => alert("edit")}
                                       showEditControls={context.isUser}
                                       isAlbum={album ? true : false}
                                       isPrivate={photos[idx].private}
                                       isLargeDisplay={isLargeDisplay}
                                       inFullscreen={false}
                                       hasBorders={hasBorders()}
                                       verticalEditButtons={hasBorders()}

                        />
                        <img className={getImageClass()} alt={photos[idx].title}
                             src={PhotosApi.getImageUrl(photos[idx], PhotoType.Dynamic, isPortrait, isLargeDisplay)}/>

                    </Grid>
                    <Grid item xs={12} className={hasBorders() ? classes.photoDetailBorders : classes.photoDetail}>
                            <PhotoDetail2 photo={photos[idx]}/>
                    </Grid>
                </Grid>
                <FullScreenPhoto photo={photos[idx]} openDialog={showFullscreen}
                                 onClose={() => setShowFullscreen(false)} onNext={handleForward}
                                 onPrev={handleBackward} photoBackground={context.uxConfig.photoBackgroundColor}
                                 largeDisplay={isLargeDisplay}/>
                <EditPhoto open={showUpdate} photo={photos[idx]} onClose={handleCloseUpdate}/>
                <MPDialog open={showDelete}
                          onClose={() => setShowDelete(false)}
                          onOk={deletePhoto}
                          title={"Delete Photo?"}
                          text="By removing the photo all associated image data will be deleted"/>
            </>
            }
        </div>
    )
}

export default DynamicPhotoPage