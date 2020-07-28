import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import BioDialog from "./BioDialog";
import AlbumGrid from "./AlbumGrid";

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
    }),
);

export default function AlbumPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BioDialog/>
            <AlbumGrid columns={3} spacing="normal"/>
            {/*<PhotoGrid maxItems={9} order="drive"/>*/}
        </div>
    );

}

