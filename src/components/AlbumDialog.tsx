import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            flexWrap: 'wrap',
            margin: 'auto',
            width: 1020,
            maxWidth: 1020,
            paddingBottom: theme.spacing(4),
            paddingLeft: theme.spacing(4)
        },
    }),
)

const AlbumDialog: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
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

export default AlbumDialog
