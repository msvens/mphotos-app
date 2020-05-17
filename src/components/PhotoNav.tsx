import React from 'react';
import {createStyles, Divider, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {Photo} from "../types/photo";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import FaceIcon from '@material-ui/icons/Face';

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
    photo: Photo,
    isLoggedIn: boolean
}

const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const PhotoNav: React.FC<PhotoNavProps> = (props: PhotoNavProps) => {

    const classes = useStyles();

    const getText = ():string => {
        const date = new Date(props.photo.originalDate);
        const dateStr = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
        var detail = props.photo.title + ". " + dateStr + ". " + props.photo.width + "x" + props.photo.height + ". ";
        detail = detail + props.photo.cameraModel + " • " + props.photo.cameraMake;
        if(props.photo.lensModel) {
            detail = detail + " • " + props.photo.lensModel;
        }
        detail = detail + ". f" + props.photo.fNumber + " • iso" + props.photo.iso + " • " + props.photo.exposure +" secs.";
        return detail
    }

    return (
        <div className={classes.root}>
                <Grid container justify="space-around" alignItems="center">
                    <Grid item>
                        {props.isLoggedIn &&
                        <IconButton aria-label="profile picture" color="inherit" onClick={props.onClickProfile}>
                            <FaceIcon fontSize="large"/>
                        </IconButton>
                        }
                        <IconButton aria-label="previous" color="inherit" onClick={props.onClickPrev}>
                            <ArrowBackIosSharpIcon fontSize="large"/>
                        </IconButton>
                        <IconButton aria-label="next" color="inherit" onClick={props.onClickForward} >
                            <ArrowForwardIosSharpIcon fontSize="large"/>
                        </IconButton>
                        {props.isLoggedIn &&
                        <IconButton aria-label="delete photo" color="inherit">
                            <DeleteForeverIcon fontSize="large"/>
                        </IconButton>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom align="center">
                            {getText()}
                        </Typography>
                        {/*<Divider className={classes.divider}/>*/}
                    </Grid>
                </Grid>
        </div>
    )
};

export default PhotoNav