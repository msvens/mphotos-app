import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import {Link} from "react-router-dom";
import PhotosApi from "../services/api";
import GridList from "@material-ui/core/GridList";
import {Photo} from "../types/photo";

interface PhotoGridProps {
    maxItems: number,
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

const PhotoGrid: React.FC<PhotoGridProps> = (props: PhotoGridProps) => {
    const classes = useStyles();

    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        PhotosApi.getPhotos(props.maxItems).then(res => {
            if (res.photos)
                setPhotos(res.photos)
        });
    }, [props.maxItems]);

    return (
        <GridList cols={3} cellHeight={'auto'} spacing={15} className={classes.root}>
            {photos.map(photo => (
                <GridListTile className={classes.thumb} cols={1} key={photo.driveId}>
                    <Link to={`/photo/${photo.driveId}`}>
                        <img alt={photo.fileName} className={classes.thumb} src={PhotosApi.getThumbUrl(photo)}/>
                    </Link>
                </GridListTile>
            ))}
        </GridList>
    );
};

export default PhotoGrid;