import React, {useContext, useEffect, useState} from 'react';
import PhotosApi, {User} from "../common/api";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, Button, Divider, Grid, Paper, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import {Link} from "react-router-dom";
import {MPContext} from "../App";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            flexWrap: 'wrap',
            margin: 'auto',
            paddingBottom: theme.spacing(4),
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
        adminButton: {
            textTransform: 'none',
            radius: 3
        },
        grid: {
            paddingBottom: theme.spacing(4),
        }
    }),
);

const BioDialog: React.FC = () => {
    const classes = useStyles();

    const theme = useTheme()
    const isLargeDisplay = useMediaQuery(theme.breakpoints.up('sm'))
    const context = useContext(MPContext)

    const getImgClass = ():string => {
        if(isLargeDisplay) {
            return classes.image
        } else {
            return classes.imageSmall
        }
    }

  return (
    <div className={classes.root}>
        <Grid className={classes.grid} container spacing={6} justify="center" alignItems="center">
            <Grid item>
                <Avatar alt={context.user.name} src={PhotosApi.getProfilePicUrl(context.user)} className={getImgClass()}/>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                    <strong>{context.user.name}</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>{context.user.bio}</Typography>
            </Grid>
            {context.isUser &&
            <Grid item>
                <Button className={classes.adminButton} variant="outlined" size="small" color="inherit" component={Link} to={"/login"}>
                    Admin
                </Button>
            </Grid>
            }
        </Grid>
        <Divider/>
    </div>
  );
};

export default BioDialog
