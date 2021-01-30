import React, {useContext, useEffect, useState} from 'react';
import {
    Box, Button,
    createStyles,
    Grid, InputBase,
    makeStyles, Paper,
    Theme,
    Typography
} from "@material-ui/core";
import PhotosApi, {Guest, Photo, PhotoComment} from "../common/api";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import {AuthContext} from "../MPhotosApp";
import AddGuestDialog from "../guest/AddGuestDialog";
//import AddGuestDialog2 from "../common/AddGuestDialog2";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2)
        },
        likedIcon: {
            color: '#b5043c'
        },
        commentBox: {
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(2)
        },
        commentInput: {
            marginLeft: theme.spacing(1),
            flex: 1,
            fontSize: '0.9rem'
        },
        commentRoot: {
            marginTop: theme.spacing(3),
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.grey[50]

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
    const [comments, setComments] = useState<PhotoComment[]> ([])
    const [showAddGuest, setShowAddGuest] = useState(false)
    const [newComment, setNewComment] = useState<string>('')
    const [likesPhoto, setLikesPhoto] = useState<boolean> (false)
    const context = useContext(AuthContext)

    useEffect( () => {
        if(context.isGuest) {
            PhotosApi.getGuestLike(props.photo.driveId).then(res => setLikesPhoto(res)).catch(e => alert("error: "+e.toString()))
        } else {
            setLikesPhoto(prev => false)
        }
    }, [props.photo, context.isGuest])

    useEffect(() => {
        PhotosApi.getPhotoLikes(props.photo.driveId).then(res => setGuests(res)).catch(e => alert("error: "+e.toString()))

    }, [props.photo, likesPhoto])

    useEffect(() => {
        PhotosApi.getPhotoComments(props.photo.driveId).then(res => setComments(res)).catch(e => alert("error: "+e.toString()))

    }, [props.photo])

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    }

    const handleAddComment = () => {
        if(!context.isGuest) {
            setShowAddGuest(true)
        } else {
            PhotosApi.commentPhoto(props.photo.driveId, newComment)
                .then(res => {
                    setNewComment('')
                    PhotosApi.getPhotoComments(props.photo.driveId)
                        .then(res => setComments(res))
                }).catch(err => alert(err))
        }
    }

    const handleClickLike = () => {
        if(!context.isGuest) {
            setShowAddGuest(true)
        } else {
            PhotosApi.likePhoto(props.photo.driveId).then(res => setLikesPhoto(true)).catch(e => alert(e))

        }
    }

    const handleClickUnlike = () => {
        PhotosApi.unlikePhoto(props.photo.driveId).then(res => setLikesPhoto(false)).catch(e => alert(e))
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
                case 2:
                    return "liked by you and " + (guests.length - 1) + " other"
                default:
                    return "liked by you and " + (guests.length - 1) + " others"
            }
        } else {
            switch (guests.length) {
                case 1:
                    return "Liked by "+guests[0].name
                case 2:
                    return "liked by "+guests[0].name+" and " + (guests.length - 1) + " other"
                default:
                    return "liked by "+guests[0].name+" and " + (guests.length - 1) + " others"
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

    interface CommentBoxProps {
        comment: PhotoComment,
        index: number
    }

    const CommentBox: React.FC<CommentBoxProps> = ({comment, index}) => {
        const d = PhotosApi.toDate(comment.time)
        const dStr = d.toDateString()
        return (
            <div className={classes.commentBox}>
                <Typography variant="body2" color={"secondary"}>
                        {comment.guest}, {dStr}
                </Typography>
                <Typography variant="body2">
                    {comment.body}
                </Typography>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    {getLikesButton()}
                    <Typography variant="body2" display={"inline"}>
                            {getLikes()}
                    </Typography>
                    <Paper component="form" variant="outlined" className={classes.commentRoot}>
                    <InputBase
                        className={classes.commentInput}
                        placeholder="Add comment..."
                        multiline={true}
                        onChange={handleCommentChange}
                        value={newComment}
                        inputProps={{ 'aria-label': 'Add comment...' }}
                    />
                    <Button onClick={handleAddComment}>Post</Button>
                    </Paper>
                    {comments.map((comment,index) => (
                        <CommentBox comment={comment} index={index}/>
                    ))}

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
            <AddGuestDialog open={showAddGuest} update={false}
                             onClose={() => setShowAddGuest(false)} />
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