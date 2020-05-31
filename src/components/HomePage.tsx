import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
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

    return (
        <div className={classes.root}>
            <BioDialog/>
            <PhotoGrid maxItems={9} order="drive"/>
        </div>
    );

}

