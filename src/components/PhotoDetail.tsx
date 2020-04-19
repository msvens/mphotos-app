import React, {useEffect, useState} from 'react';
import {makeStyles, createStyles, Theme, Grid, Paper} from "@material-ui/core";
import {Photo} from "../types/photo";
import {MPhotosResponse} from "../types/service";
import {getImageUrl} from "../services/usePhotosService";
import IconButton from "@material-ui/core/IconButton";
import {FastForward, FastRewind} from "@material-ui/icons";


interface PhotoProps {
    id: string,
}


interface PhotoPayload {
    data: Photo
}

interface PhotoResp {
    error?: string,
    data?: Photo
}



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginLeft: theme.spacing(8),
            marginRight: theme.spacing(8),
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'left',
            color: theme.palette.text.secondary,
            alignContent: 'center'
        },
        img: {
            width: "100%"
        },
        title: {
          textDecoration: "underline"
        }
    }),
);


// const PhotoBrowser: React.FC<PhotoProps>  = ({id}) => {
//
//     const [photos, setPhotos] = useState<Photo[]> ([]);
//     const [idx, setIdx] = useState<number> (0);
//
//     useEffect(() => {
//
//         const pl = await fetch("http://localhost:8060/api/photos")
//             .then(res => res.json())
//         if(pl.data) {
//             setPhotos(pl.data)
//         }
//     }, []);
// };


const PhotoDetail: React.FC<PhotoProps> = ({ id }) => {


    const [result, setResult] = useState<MPhotosResponse<Photo>> ({});
    const [photoId, setPhotoId] = useState<string> (id);

    useEffect(() => {
        const fetchData = async () => {
            console.log(photoId)
            const pl = await fetch(`http://localhost:8060/api/photos/${photoId}`)
                .then(res => res.json())
                .then(res => setResult(res));
        };
        fetchData()
    }, [photoId]);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            {result.data &&
            <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <img className={classes.img} src={getImageUrl(result.data)} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <b className={classes.title}>{result.data.title}</b><br/>
                        <ul>
                            <li>{result.data.originalDate}</li>
                            <li>{result.data.cameraMake} ({result.data.cameraModel})</li>
                            {result.data.lensModel &&
                                <li>{result.data.lensModel}</li>
                            }
                            <li>fvalue: {result.data.fNumber}</li>
                            <li>exposure: {result.data.exposure}</li>
                            <li>ISO: {result.data.iso}</li>
                        </ul>
                        <IconButton aria-label="previous" color="inherit">
                            <FastRewind />
                        </IconButton>
                        Browse Images
                        <IconButton aria-label="next" color="inherit">
                            <FastForward />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
            </Grid>
            }
        </div>
    );
};

export default PhotoDetail