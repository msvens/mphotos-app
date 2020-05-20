import React, {useEffect, useState} from 'react';
import PhotosApi, {User} from "../services/api";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            flexWrap: 'nowrap',
            margin: 'auto',
            width: 1020,
            maxWidth: 1020,
            paddingBottom: theme.spacing(4),
            paddingLeft: theme.spacing(4)
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
        },
        image: {
            width: 128,
            height: 128,
            maxWidth: 128,
            maxHeight: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }),
);

const BioDialog: React.FC = () => {
    const classes = useStyles();

    const [user, setUser] = useState<User> ();

    useEffect( () => {
        PhotosApi.getUser()
            .then(u => setUser(u))
            .catch(e => alert(e.toString()));
    }, []);

    const getName = ():string => {
        return user && user.name ? user.name : "";
    };

    const getBio = ():string => {
        return user && user.bio ? user.bio : "";
    };


  return (
    <div className={classes.root}>
        <Grid container spacing={3} justify="flex-start" alignItems="center">
            <Grid item>
                {user && user.pic &&
                <Avatar alt={getName()} src={PhotosApi.getProfilePicUrl(user)} className={classes.image}/>
                }
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                    <strong>
                    {getName()}
                    </strong>
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {getBio()}
                </Typography>
            </Grid>
        </Grid>
    </div>
  );
};

export default BioDialog;
