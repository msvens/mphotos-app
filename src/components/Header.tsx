
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MonochromePhotosIcon from '@material-ui/icons/MonochromePhotos';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AboutPage from "./AboutPage";
import AccountPage from "./AccountPage";
import PhotoPage from "./PhotoPage";
import HomePage from "./HomePage";
import 'typeface-roboto';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, RouteComponentProps
} from "react-router-dom";
import {Divider} from "@material-ui/core";
import ScrollIntoView from "./ScrollIntoView";


interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 'auto',
            minHeight: '100vh',
            backgroundColor: theme.palette.grey["50"],
            paddingBottom: theme.spacing(5)
        },
        appBar: {
            paddingLeft:theme.spacing(2),
            marginLeft: 0,
            paddingRight:theme.spacing(2),
            marginRight: 0,
            backgroundColor: theme.palette.common.white
        },
        title: {
            flexGrow: 1,
            marginLeft:0,
            paddingLeft: theme.spacing(2),
        },
        appBarDivider: {
        },
        content: {
            paddingTop: theme.spacing(5),
        },
    }),
);

export default function PrimaryAppBar() {
    const classes = useStyles();

    return (
        <Router>
            <ScrollIntoView/>
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="sticky" color={'transparent'} elevation={0}>
                <Toolbar style={{paddingLeft:0, paddingRight:0}}>
                    <Typography variant="h5" className={classes.title}>
                        Mellowtech Photos
                    </Typography>
                    <IconButton aria-label="home" color="inherit" component={Link} to="/">
                        <HomeOutlinedIcon fontSize={"large"}/>
                    </IconButton>
                    <IconButton aria-label="photos" color="inherit" component={Link} to="/photos">
                        <MonochromePhotosIcon fontSize={"large"}/>
                    </IconButton>
                    <IconButton aria-label="about" color="inherit" component={Link} to="/about">
                       <InfoOutlinedIcon fontSize={"large"}/>
                    </IconButton>
                    <IconButton aria-label="login" color="inherit" component={Link} to="/login">
                        <AccountBoxOutlinedIcon fontSize={"large"}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Divider className={classes.appBarDivider}/>
            <div className={classes.content}>
            <Switch>
                <Route path="/photos" render={() => <PhotoPage id="" />} />
                <Route path="/about" render={() => <AboutPage/>} />
                <Route path="/login" render={() => <AccountPage/>} />
                <Route path={"/photo/:id"} render={( {match}: MatchProps) => (
                    <PhotoPage id={match.params.id} /> )} />
                <Route path="/" render={() => <HomePage/>} />
            </Switch>
            </div>
        </div>
        </Router>
    );
}