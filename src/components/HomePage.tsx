import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import PhotoGrid2 from "./PhotoGrid2";
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
    }),
);

export default function HomePage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BioDialog/>
            <PhotoGrid2 columns={3} maxItems={1000} order="drive" spacing="thin"/>
            {/*<PhotoGrid maxItems={9} order="drive"/>*/}
        </div>
    );

}

