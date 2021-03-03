import React, {useContext, useEffect, useState} from 'react';
import {createStyles, Grid, makeStyles, Theme, useMediaQuery, useTheme} from "@material-ui/core";
import PhotoDetail2 from "./PhotoDetail2";
import {MPContext} from "../App";
import PhotosApi, {
    Album,
    ColorScheme,
    colorScheme,
    parseSearchParams,
    Photo,
    PhotoList,
    PhotoType
} from "../common/api";
import PhotoControls from "./PhotoControls";
import MPDialog from "../common/MPDialog";
import EditPhoto from "./EditPhoto";
import FullScreenPhoto from "./FullScreenPhoto";
import PhotoFilter from "./PhotoFilter";
import {useHistory, useParams} from "react-router";
import {useLocation} from "react-router-dom";

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

class PhotoDeck {
    private photos: Photo[]
    private idx: number


    constructor(photos?: Photo[], idx?: number) {
        this.photos = photos ? photos : []
        this.idx = idx ? idx : 0
    }

    isEmpty(): boolean {
        return this.photos.length === 0
    }

    hasPhotos(): boolean {
        return this.photos.length > 0
    }

    get(): Photo {
        if(this.isEmpty())
            throw new Error("no photos")
        return this.photos[this.idx]
    }

    driveId(): string {
        return this.get().driveId
    }

    delete(): PhotoDeck {
        const driveId = this.get().driveId
        const newPhotos = this.photos.filter(p => p.driveId !== driveId)
        const newIdx = this.idx >= newPhotos.length ? 0 : this.idx
        return new PhotoDeck(newPhotos, newIdx)
    }

    update(p: Photo): PhotoDeck {
        const newPhotos = this.photos.map((photo) => {
            if (photo.driveId === p.driveId) {
                return p
            } else
                return photo
        })
        return new PhotoDeck(newPhotos, this.idx)
    }

    next(): PhotoDeck {
        const newIdx = this.idx + 1 >= this.photos.length ? 0 : this.idx + 1
        return new PhotoDeck(this.photos, newIdx)
    }

    previous(): PhotoDeck {
        const newIdx = this.idx - 1 < 0 ? this.photos.length - 1 : this.idx - 1
        return new PhotoDeck(this.photos, newIdx)
    }


}


const DynamicPhotoPage: React.FC = () => {

    const {photoId,albumId}= useParams()
    const location = useLocation()
    const history = useHistory()
    const context = useContext(MPContext)
    const cs = colorScheme(context.uxConfig.photoBackgroundColor)
    const classes = useStyles(cs)
    const theme = useTheme()
    const [photos, setPhotos] = useState<PhotoDeck> (new PhotoDeck())
    const [album, setAlbum] = useState<Album>()
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showFullscreen, setShowFullscreen] = useState(false)
    const touch: TouchState = {xStart: -1, xPos: -1, yStart: -1, yPos: -1}

    const isPortrait = useMediaQuery('(orientation: portrait)')
    const isLargeDisplay = useMediaQuery(theme.breakpoints.up('sm'))

    useEffect(() => {

        const updatePhotos = (pl: PhotoList) => {
            if (pl.photos) {
                let newIdx = 0
                if (photoId) {
                    for (let i = 0; i < pl.length; i++) {
                        if (pl.photos[i].driveId === photoId) {
                            newIdx = i
                        }
                    }
                }
                setPhotos(new PhotoDeck(pl.photos, newIdx))
            } else {
                setPhotos(new PhotoDeck())
            }

        }

        const fetchData = async () => {
            if (location.search) {
                await PhotosApi.searchPhotos(parseSearchParams(location.search)).then(res => {
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
    }, [photoId, location.search, albumId])

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
        PhotosApi.deletePhoto(photos.driveId(), true)
            .then(p => {
                setPhotos(photos.delete())
            })
            .catch(e => alert(e.toString()))
    }

    const handleBackward = () => {
        setPhotos(photos.previous())
        window.history.pushState({}, '', '/photos/' + photos.driveId())
    }

    const handleCloseUpdate = (p?: Photo) => {
        if (p) {
            setPhotos(photos.update(p))
        }
        setShowUpdate(false)
    }

    const handleForward = () => {
        setPhotos(photos.next())
        window.history.pushState({}, '', '/photos/' + photos.driveId())
    }

    const handlePrivate = () => {
        PhotosApi.togglePrivate(photos.driveId())
            .then(p => {
                setPhotos(photos.update(p))
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
            {photos.hasPhotos() &&
            <>
                <Grid container alignItems="center" justify="space-around">
                    {location.search &&
                    <Grid item xs={12}>
                        <PhotoFilter colorScheme={cs} filter={location.search} onClear={() => history.push('/photos/'+photos.driveId())}/>
                    </Grid>
                    }
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
                                       isPrivate={photos.get().private}
                                       isLargeDisplay={isLargeDisplay}
                                       inFullscreen={false}
                                       hasBorders={hasBorders()}
                                       verticalEditButtons={hasBorders()}

                        />
                        <img className={getImageClass()} alt={photos.get().title}
                             src={PhotosApi.getImageUrl(photos.get(), PhotoType.Dynamic, isPortrait, isLargeDisplay)}/>

                    </Grid>
                    <Grid item xs={12} className={hasBorders() ? classes.photoDetailBorders : classes.photoDetail}>
                            <PhotoDetail2 photo={photos.get()}/>
                    </Grid>
                </Grid>
                <FullScreenPhoto photo={photos.get()} openDialog={showFullscreen}
                                 onClose={() => setShowFullscreen(false)} onNext={handleForward}
                                 onPrev={handleBackward} photoBackground={context.uxConfig.photoBackgroundColor}
                                 largeDisplay={isLargeDisplay}/>
                <EditPhoto open={showUpdate} photo={photos.get()} onClose={handleCloseUpdate}/>
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