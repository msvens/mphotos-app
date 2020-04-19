import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info'
import GitHubIcon from '@material-ui/icons/GitHub';
import SearchIcon from '@material-ui/icons/Search';
import About from "./About";
import Login from "./Login";
import Search from "./Search"
import PhotoDetail from "./PhotoDetail";
import 'typeface-roboto';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, RouteComponentProps
} from "react-router-dom";

interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 1000,
            margin: 'auto',
        },
        appBar: {
          background: 'darkgreen',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function PrimaryAppBar() {
    const classes = useStyles();

    return (
        <Router>
        <div className={classes.root}>
            <AppBar position="static" color={'transparent'} elevation={0}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Mellowtech Photos
                    </Typography>
                    <IconButton aria-label="search" color="inherit" component={Link} to="/search">
                        <SearchIcon />
                    </IconButton>
                    <IconButton aria-label="github" color="inherit" href="https://github.com/msvens">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton aria-label="about" color="inherit" component={Link} to="/about">
                        <InfoIcon />
                    </IconButton>
                    <IconButton aria-label="login" color="inherit" component={Link} to="/login">
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/search" render={() => <Search/>} />
                <Route path="/about" render={() => <About/>} />
                <Route path="/login" render={() => <Login/>} />
                <Route path={"/photo/:id"} render={( {match}: MatchProps) => (
                    <PhotoDetail id={match.params.id} /> )} />
                <Route path="/" render={() => <About/>} />
            </Switch>
        </div>

        </Router>
    );
}