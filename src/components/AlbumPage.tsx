import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AlbumGrid from "./AlbumGrid";
import AlbumDialog from "./AlbumDialog";

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
        info: {
            flexGrow: 1,
            flexWrap: 'wrap',
            margin: 'auto',
            width: 1020,
            maxWidth: 1020,
            paddingBottom: theme.spacing(4),
            paddingLeft: theme.spacing(4)
        }
    }),
);

export default function AlbumPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AlbumDialog/>
            <AlbumGrid columns={3} spacing="normal"/>
        </div>
    );

}

