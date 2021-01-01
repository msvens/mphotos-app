import React, {useEffect, useState} from 'react';
import {Box, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import PhotosApi, {Guest, Photo} from "../services/api";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import AddGuestDialog from "./AddGuestDialog";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: theme.spacing(1),
            //alignItems: 'center',
            //justifyContent: 'center',
        },
        likedIcon: {
            color: '#b5043c'
        }
    })
)

interface PhotoDetail2Props {
    photo: Photo,
    showDate?: boolean,
    showKeywords?: boolean,
    showDescription?: boolean,
    showLens?: boolean,
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const PhotoDetail2: React.FC<PhotoDetail2Props> = (props: PhotoDetail2Props) => {

    const classes = useStyles()

    const [guests, setGuests] = useState<Guest[]>([])
    const [showAddGuest, setShowAddGuest] = useState(false)
    const [isGuest, setIsGuest] = useState<boolean> (false)
    const [likesPhoto, setLikesPhoto] = useState<boolean> (false)

    useEffect( () => {
        const fetchData = async () => {
            await PhotosApi.isGuest().then(res => {
                setIsGuest(res)
            }).catch(e => alert("error: "+e.toString()))
        }
        fetchData()
    }, [])

    useEffect( () => {
        if(isGuest) {
            PhotosApi.getGuestLike(props.photo.driveId).then(res => setLikesPhoto(res)).catch(e => alert("error: "+e.toString()))
        }
    }, [props.photo, isGuest])

    useEffect(() => {
        PhotosApi.getPhotoLikes(props.photo.driveId).then(res => setGuests(res)).catch(e => alert("error: "+e.toString()))
    }, [props.photo, likesPhoto]);

    const handleCloseUpdate = () => {
        setShowAddGuest(false)
    }

    const handleClickLike = () => {
        if(!isGuest) {
            setShowAddGuest(true)
        } else {
            PhotosApi.likePhoto(props.photo.driveId).then(res => setLikesPhoto(true)).catch(e => alert(e))

        }
    }

    const handleClickUnlike = () => {
        PhotosApi.unlikePhoto(props.photo.driveId).then(res => setLikesPhoto(false)).catch(e => alert(e))
        //alert("unlike")
    }

    const addGuest = (name: string, email: string) => {
        alert("clicked Register")
    }

    const getDate = () => {
        const date = new Date(props.photo.originalDate)
        return "Taken on " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + ". "
    }

    const getLikes = () => {
        if (guests.length === 0) {
            return "Be the first to like this picture"
        }
        if (likesPhoto) {
            switch (guests.length) {
                case 1:
                    return "Liked by you"
                default:
                    return "liked by you and " + (guests.length - 1) + " others"
            }
        } else {
            switch (guests.length) {
                case 1:
                    return "Liked by you"
                default:
                    return "liked by you and " + (guests.length - 1) + " others"
            }
        }
    }

    const getTitle = () => {
        return props.photo.title === "" ? "Unknown" : props.photo.title;
    }

    const getCamera = () => {
        return props.photo.cameraModel
    }

    const getLens = () => {
        return props.photo.lensModel
    }

    const getFocal = () => {
        if (props.photo.focalLength35 !== "")
            return props.photo.focalLength + " (" + props.photo.focalLength35 + "). ";
        else
            return props.photo.focalLength + ". ";
    }

    const getCameraSetting = () => {
        return "f" + props.photo.fNumber + ". iso" + props.photo.iso + ". " + props.photo.exposure + " secs."
    }

    const getLikesButton = () => {
        if (likesPhoto) {
            return <IconButton edge={"start"} aria-label={"like"} className={classes.likedIcon} size={"small"}
                        onClick={handleClickUnlike}>
                <FavoriteIcon fontSize={"large"}/>
            </IconButton>
        } else {
            return <IconButton edge={"start"} aria-label={"like"} color="inherit" size={"small"}
                               onClick={handleClickLike}>
                <FavoriteBorderIcon fontSize={"large"}/>
            </IconButton>
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    {getLikesButton()}
                    <IconButton aria-label={"comment"} color="inherit" size={"small"}>
                        <CommentOutlinedIcon fontSize={"large"}/>
                    </IconButton>
                    <Typography variant="body2">
                            {getLikes()}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                        <Box fontWeight={"fontWeightBold"}>
                            {getTitle()}.
                        </Box>
                    </Typography>
                    <Typography variant="body2">
                        {getDate()}
                        <br/>
                        Camera: <Link component={RouterLink} to={`/search?cameraModel=${props.photo.cameraModel}`}>
                            {getCamera()}
                        </Link><br/>
                        Focal length: {getFocal()}<br/>
                        Settings: {getCameraSetting()}<br/>
                        Lens: {getLens()}
                    </Typography>
                </Grid>
            </Grid>
            <AddGuestDialog open={showAddGuest}
                             onClose={handleCloseUpdate} onSubmit={addGuest}/>
        </div>
    )
}

PhotoDetail2.defaultProps = {
    showDate: true,
    showKeywords: false,
    showDescription: false,
    showLens: true
} as Partial<PhotoDetail2Props>

export default PhotoDetail2