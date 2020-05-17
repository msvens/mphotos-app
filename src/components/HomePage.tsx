import React, {useEffect, useState} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import PhotosApi from "../services/api";
import {Photo} from "../types/photo";
import PhotoGrid from "./PhotoGrid";
import BioDialog from "./BioDialog";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            paddingLeft: 0,
            margin: 'auto',
        },
        gridList: {
            width: 1020,
            maxWidth: 1020,
            margin: 'auto',

        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        thumb: {
            width: '100%',
            height: 'auto'
        },
        info: {
            height: 150,
        }
    }),
);

export default function HomePage() {
    const classes = useStyles();
    const [photos, setPhotos] = useState<Photo[]>([]);

    /*useEffect(() => {
        PhotosApi.getPhotos(9).then(res => {
            if(res.photos)
                setPhotos(res.photos)
        });
    }, []);*/

    return (
        <div className={classes.root}>
            <BioDialog/>
            <PhotoGrid maxItems={9} order="drive"/>
            {/*<GridList cols={3} cellHeight={'auto'} spacing={20} className={classes.gridList}>*/}
            {/*    {photos.map(photo => (*/}
            {/*        <GridListTile className={classes.thumb} cols={1} key={photo.driveId}>*/}
            {/*            <Link to={`/photo/${photo.driveId}`}>*/}
            {/*                <img className={classes.thumb} src={PhotosApi.getThumbUrl(photo)}/>*/}
            {/*            </Link>*/}
            {/*            <GridListTileBar*/}
            {/*                title={photo.title}*/}
            {/*            />*/}
            {/*        </GridListTile>*/}
            {/*    ))}*/}
            {/*</GridList>*/}

        </div>
    );

}

