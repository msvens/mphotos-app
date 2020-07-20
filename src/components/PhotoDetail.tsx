import React, {Props} from 'react';
import {
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import {Photo} from "../types/photo";
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

interface PhotoDetailProps {
    photo: Photo,
    showDate?: boolean,
    showKeywords?: boolean,
    showDescription?: boolean,
    showLens?: boolean,
}

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const PhotoDetail: React.FC<PhotoDetailProps> = (props: PhotoDetailProps) => {

    const classes = useStyles();

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

    return (
        <div className={classes.root}>
            <Grid container justify="space-around" alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom align="center">
                        {getTitle()}{getDimension()}
                        <Link component={RouterLink} to={`/search?cameraModel=${props.photo.cameraModel}`}>
                            {getCamera()}
                        </Link>. {getFocal()}{getCameraSetting()}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
};

PhotoDetail.defaultProps = {
    showDate: false,
    showKeywords: false,
    showDescription: false,
    showLens: false
} as Partial<PhotoDetailProps>;

export default PhotoDetail