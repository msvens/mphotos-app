import React, {useState} from 'react';
import {
    createStyles,
    Grid,
    makeStyles,
    Theme, Tooltip,
    Typography
} from "@material-ui/core";
import {Photo} from "../types/photo";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import FaceIcon from '@material-ui/icons/Face';
import DeletePhotosDialog from "./DeletePhotosDialog";
import EditPhotoDialog from "./EditPhotoDialog";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 'auto',
            paddingBottom: theme.spacing(2)
        },
        divider: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
    }),
);

interface PhotoNavProps {
    onClickPrev: () => void,
    onClickForward: () => void,
    onClickProfile: () => void,
    onDelete: (removeFiles: boolean) => void
    onUpdatePhoto: (title: string, description: string, keywords: string) => void,
    photo: Photo,
    isLoggedIn: boolean
}

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const PhotoNav: React.FC<PhotoNavProps> = (props: PhotoNavProps) => {

    const classes = useStyles();
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)

    const getDate = () => {
        const date = new Date(props.photo.originalDate);
        return months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + ". ";
    };

    const getCamera = () => {
        return props.photo.cameraModel
    };
    const getFocal = () => {
        if (props.photo.focalLength35 !== "")
            return props.photo.focalLength + " (" + props.photo.focalLength35 + "). ";
        else
            return props.photo.focalLength + ". ";
    };
    const getCameraSetting = () => {
        return "f" + props.photo.fNumber + ". iso" + props.photo.iso + ". " + props.photo.exposure + " secs."
    };
    const getDimension = () => {
        return props.photo.width + "x" + props.photo.height + ". ";
    };

    const getTitle = () => {
        return props.photo.title === "" ? "" : props.photo.title + ". ";
    };

    const handleCancelDelete = () => {
        setShowDelete(false);
    };

    const handleCloseUpdate = () => {
        setShowUpdate(false)
    }

    return (
        <div className={classes.root}>

            <Grid container justify="space-around" alignItems="center">
                <Grid item>
                    {props.isLoggedIn &&
                    <Tooltip title="Set Profile Picture">
                        <IconButton aria-label="profile picture" color="inherit" onClick={props.onClickProfile}>
                            <FaceIcon fontSize="large"/>
                        </IconButton>
                    </Tooltip>
                    }
                    {props.isLoggedIn &&
                    <IconButton aria-label="edit picture" color="inherit" onClick={() => setShowUpdate(true)}>
                        <EditIcon fontSize="large"/>
                    </IconButton>
                    }
                    <IconButton aria-label="previous" color="inherit" onClick={props.onClickPrev}>
                        <ArrowBackIosSharpIcon fontSize="large"/>
                    </IconButton>
                    <IconButton aria-label="next" color="inherit" onClick={props.onClickForward}>
                        <ArrowForwardIosSharpIcon fontSize="large"/>
                    </IconButton>
                    {props.isLoggedIn &&
                    <IconButton aria-label="delete photo" color="inherit" onClick={() => setShowDelete(true)}>
                        <DeleteForeverIcon fontSize="large"/>
                    </IconButton>
                    }
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom align="center">
                        {getTitle()}{getDimension()}
                        <Link component={RouterLink} to={`/search?cameraModel=${props.photo.cameraModel}`}>
                            {getCamera()}
                        </Link>. {getFocal()}{getCameraSetting()}
                    </Typography>
                </Grid>
            </Grid>
            <DeletePhotosDialog open={showDelete} onDelete={props.onDelete} onClose={handleCancelDelete}/>
            <EditPhotoDialog open={showUpdate} photo={props.photo}
                             onClose={handleCloseUpdate} onSubmit={props.onUpdatePhoto}/>
        </div>
    )
};

export default PhotoNav