import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AlbumGrid from "./AlbumGrid";
import {Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            paddingLeft: 0,
            margin: 'auto',
            paddingTop: theme.spacing(4)
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
    const classes = useStyles()

    const AlbumPageHeader: React.FC = () => {
        const classes = useStyles();

        return (
            <div className={classes.info}>
                <Grid container spacing={3} justify="flex-start" alignItems="center">
                    <Grid item>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Photo Albums</strong>
                        </Typography>
                        <Typography variant="body2" gutterBottom>Things that fit</Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <AlbumPageHeader/>
            <AlbumGrid columns={3} spacing="normal"/>
        </div>
    );

}

