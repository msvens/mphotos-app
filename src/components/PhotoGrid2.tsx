import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GridListTile from "@material-ui/core/GridListTile";
import {Link} from "react-router-dom";
import PhotosApi from "../services/api";
import GridList from "@material-ui/core/GridList";
import {Photo} from "../types/photo";

interface PhotoGrid2Props {
    maxItems: number,
    columns: number,
    spacing: "thin" | "normal" | "thick",
    order: "original" | "drive"
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            width: 1020,
            maxWidth: 1020,
            margin: 'auto',

        },
        thumb: {
            width: '100%',
            height: 'auto'
        },
    }),
);

const PhotoGrid2: React.FC<PhotoGrid2Props> = (props: PhotoGrid2Props) => {
    const classes = useStyles();

    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        PhotosApi.getPhotos(props.maxItems).then(res => {
            if (res.photos)
                setPhotos(res.photos)
        });
    }, [props.maxItems]);

    const getSpacing = (): number => {
        if(props.spacing === "normal") {
            return 15;
        } else if(props.spacing === "thin") {
            return 10;
        } else {
            return 20;
        }
    }

    return (
        <GridList cols={props.columns} cellHeight={'auto'} spacing={getSpacing()} className={classes.root}>
            {photos.map(photo => (
                <GridListTile className={classes.thumb} cols={1} key={photo.driveId}>
                    <Link to={`/photo/${photo.driveId}`}>
                        <LazyLoadImage alt={photo.fileName} className={classes.thumb} src={PhotosApi.getThumbUrl(photo)}/>
                    </Link>
                </GridListTile>
            ))}
        </GridList>
    );
};

export default PhotoGrid2;