import React, {useEffect, useState} from 'react';
import withWidth, {isWidthUp, WithWidth} from '@material-ui/core/withWidth';
import PhotosApi, {User} from "../services/api";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, Grid, Typography} from "@material-ui/core";

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
        image: {
            width: 128,
            height: 128,
            maxWidth: 128,
            maxHeight: 128,
        },
        imageSmall: {
            width: 68,
            height: 68,
            maxWidth: 68,
            maxHeight: 68,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }),
);

const AlbumDialog: React.FC<WithWidth> = (props:WithWidth) => {
    const classes = useStyles();

    const [user, setUser] = useState<User> ();

    useEffect( () => {
        PhotosApi.getUser()
            .then(u => setUser(u))
            .catch(e => alert(e.toString()));
    }, []);

    const getImgClass = ():string => {
        if(isWidthUp('sm', props.width)) {
            return classes.image
        } else {
            return classes.imageSmall
        }
    }

  return (
    <div className={classes.root}>
        <Grid container spacing={3} justify="flex-start" alignItems="center">
            <Grid item>
                {user && user.pic &&
                <Avatar alt={user.name} src={PhotosApi.getProfilePicUrl(user)} className={getImgClass()}/>
                }
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                    <strong>Photo Albums</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>Things that fit</Typography>
            </Grid>
        </Grid>
    </div>
  );
};

export default withWidth() (AlbumDialog);
