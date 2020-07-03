import React from 'react';
import {createStyles, fade, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MonochromePhotosIcon from '@material-ui/icons/MonochromePhotos';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
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
import {Box, Divider, Hidden} from "@material-ui/core";
import ScrollIntoView from "./ScrollIntoView";
import MPIcon from "./MPIcon";
import MPWordIcon from "./MPWordIcon";
import InputBase from "@material-ui/core/InputBase";
import TopBar from "./TopBar";
import PhotoPage2 from "./PhotoPage2";


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
            paddingLeft: theme.spacing(2),
            marginLeft: 0,
            paddingRight: theme.spacing(2),
            marginRight: 0,
            backgroundColor: theme.palette.common.white
        },
        wordTitle: {
            marginLeft: 0,
            paddingLeft: theme.spacing(1),
            flexGrow: 1,
        },
        iconTitle: {
            flexGrow: 1,
            marginLeft: 0,
        },
        appBarDivider: {},
        content: {
            paddingTop: theme.spacing(5),
        },
        grow: {
            flexGrow: 1,
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.grey["50"],
            // backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }),
);

export default function MPhotosApp() {
    const classes = useStyles();
    const showSearch = false;

    return (
        <Router>
            <ScrollIntoView/>
            <div className={classes.root}>
                <TopBar showSearch={false}/>
                <Divider className={classes.appBarDivider}/>
                <div className={classes.content}>
                    <Switch>
                        <Route path="/photos" render={() => <PhotoPage2 id=""/>}/>
                        <Route path="/about" render={() => <AboutPage/>}/>
                        <Route path="/login" render={() => <AccountPage/>}/>
                        <Route path={"/photo/:id"} render={({match}: MatchProps) => (
                            <PhotoPage id={match.params.id}/>)}/>
                        <Route path="/search" render={(props: RouteComponentProps) => {
                            return <PhotoPage2 id="none" query={props.location.search}/>
                        }}/>
                        <Route path="/" render={() => <HomePage/>}/>
                    </Switch>
                </div>

            </div>
        </Router>
    );
}