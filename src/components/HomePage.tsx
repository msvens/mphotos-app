import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import BioDialog from "./BioDialog";
import InfinitePhotoGrid from "./InfinitePhotoGrid";

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

export default function HomePage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BioDialog/>
            <InfinitePhotoGrid fetchItems={9} columns={3} spacing="thin" order="drive"/>
            {/*<PhotoGrid2 columns={3} maxItems={1000} order="drive" spacing="thin"/>*/}
            {/*<PhotoGrid maxItems={9} order="drive"/>*/}
        </div>
    );

}

