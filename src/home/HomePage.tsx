import React, {useContext} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import BioDialog from "./BioDialog";
import InfinitePhotoGrid from "./InfinitePhotoGrid";
import {MPContext} from "../App";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            paddingLeft: 0,
            maxWidth: 1024,
            margin: 'auto',
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(2),
        },
    }),
);

export default function HomePage() {
    const classes = useStyles()
    const context = useContext(MPContext)

    return (
        <div className={classes.root}>
            {context.uxConfig.showBio &&
            <BioDialog/>
            }
            <InfinitePhotoGrid fetchItems={12}
                               columns={context.uxConfig.photoGridCols}
                               spacing={context.uxConfig.photoGridSpacing} order="drive"/>
        </div>
    );

}

