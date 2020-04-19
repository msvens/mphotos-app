import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import usePhotosService, {getImageUrl, getThumbUrl} from "../services/usePhotosService";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 1000,
            maxWidth: 1000,
            margin: 'auto',
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        thumb: {
            width: '100%',
            height: 'auto'
        },
    }),
);

export default function PhotoGrid() {
    const classes = useStyles();
    const service = usePhotosService();

    return (
        <div className={classes.root}>
            {service.status === 'loaded' &&
            <GridList cols={3} cellHeight={'auto'} spacing={20} className={classes.gridList}>
                {service.payload.data.map(photo => (
                    <GridListTile className={classes.thumb} cols={1} key={photo.driveId}>
                        <Link to={`/photo/${photo.driveId}`}>
                            <img className={classes.thumb} src={getThumbUrl(photo)}/>
                        </Link>
                        <GridListTileBar
                            title={photo.title}
                        />
                    </GridListTile>
                ))}
            </GridList>
            }
        </div>
    );

}

