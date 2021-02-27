import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AboutPage from "./about/AboutPage";
import AccountPage from "./login/AccountPage";
import HomePage from "./home/HomePage";
import 'typeface-roboto';
import {BrowserRouter as Router, Route, RouteComponentProps, Switch} from "react-router-dom";
import TopBar from "./TopBar";
import ResumePage from "./resume/ResumePage";
import AlbumPage from "./albums/AlbumPage";
import BottomBar2 from "./BottomBar2";
import VerifyPage from "./guest/GuestPage";
import ScrollToTop from "./ScrollIntoView";
import DynamicPhotoPage from "./photos/DynamicPhotoPage";


interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 0,
            minHeight: '100vh',
        },
        content: {
            flexGrow: 1,
        },
    }),
);



export default function MPhotosApp() {
    const classes = useStyles()




    return (
        <Router>
            <ScrollToTop/>
            <div className={classes.root}>
                <TopBar showSearch={false}/>
                <div className={classes.content} id="contentPage">
                    <Switch>
                        <Route path="/albums/:id" render={({match}: MatchProps) => (
                            <DynamicPhotoPage albumId={parseInt(match.params.id)}/>)}/>
                        <Route path="/albums" render={() => <AlbumPage/>}/>
                        <Route path="/resume" render={() => <ResumePage/>}/>
                        <Route path="/photos" render={() => <DynamicPhotoPage id=""/>}/>
                        <Route path="/about" render={() => <AboutPage/>}/>
                        <Route path="/login" render={() => <AccountPage/>}/>
                        <Route path={"/photo/:id"} render={({match}: MatchProps) => (
                            <DynamicPhotoPage id={match.params.id}/>)}/>
                        <Route path="/search" render={(props: RouteComponentProps) => {
                            return <DynamicPhotoPage query={props.location.search}/>
                        }}/>
                        <Route path="/guest" render={(props: RouteComponentProps) => {
                            return <VerifyPage query={props.location.search}/>
                        }}/>
                        <Route path="/" render={() => <HomePage/>}/>
                    </Switch>
                </div>
                <BottomBar2 showSearch={false}/>
            </div>
        </Router>
    );
}