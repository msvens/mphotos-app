
import React from 'react';
import {createStyles, fade, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
        wordTitle: {
            marginLeft:0,
            paddingLeft: theme.spacing(1),
            flexGrow: 1,
        },
        iconTitle: {
            flexGrow:1,
            marginLeft:0,
        },
        appBarDivider: {
        },
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

export default function PrimaryAppBar() {
    const classes = useStyles();
    const showSearch = false;

    return (
        <Router>
            <ScrollIntoView/>
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="sticky" color={'transparent'} elevation={0}>
                <Toolbar style={{paddingLeft:0, paddingRight:0}}>
                    <Hidden smUp>
                        <Box className={classes.iconTitle}>
                            <IconButton aria-label="home" color="inherit" component={Link} to="/">
                                <MPIcon key="topLogo" mpColor="white" fontSize="large"/>
                            </IconButton>
                        </Box>
                    </Hidden>
                    <Hidden xsDown>
                        <Box className={classes.wordTitle}>
                            <MPWordIcon height={32}/>
                        </Box>
                    </Hidden>
                    {showSearch &&
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    }
                    <div className={classes.grow} />
                    <IconButton aria-label="home" color="inherit" component={Link} to="/">
                        <HomeOutlinedIcon fontSize="large"/>
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
                <Route path="/search" render={(props: RouteComponentProps) => {
                    return <PhotoPage id="none" query={props.location.search}/>
                }}/>
                <Route path="/" render={() => <HomePage/>} />
            </Switch>
            </div>
        </div>
        </Router>
    );
}