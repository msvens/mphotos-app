import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AboutPage from "./about/AboutPage";
import AccountPage from "./login/AccountPage";
import HomePage from "./home/HomePage";
import 'typeface-roboto';
import {BrowserRouter as Router, Route, Switch, useLocation} from "react-router-dom";
import TopBar from "./TopBar";
import ResumePage from "./resume/ResumePage";
import AlbumPage from "./albums/AlbumPage";
import BottomBar2 from "./BottomBar2";
import GuestPage from "./guest/GuestPage";
import ScrollToTop from "./ScrollIntoView";
import DynamicPhotoPage from "./photos/DynamicPhotoPage";
import CamerasPage from "./cameras/camerasPage";


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
                        <Route path="/albums/:albumId"><DynamicPhotoPage/></Route>
                        <Route path="/albums" render={() => <AlbumPage/>}/>
                        <Route path="/cameras/:cameraId"><CamerasPage/></Route>
                        <Route path="/cameras"><CamerasPage/></Route>
                        <Route path="/resume" render={() => <ResumePage/>}/>
                        <Route path="/photos/:photoId"><DynamicPhotoPage/></Route>
                        <Route path="/photos" render={() => <DynamicPhotoPage/>}/>
                        <Route path="/about" render={() => <AboutPage/>}/>
                        <Route path="/login/:setting"><AccountPage/></Route>
                        <Route path="/login" render={() => <AccountPage/>}/>
                        <Route path="/guest"><GuestPage/></Route>
                        <Route path="/" render={() => <HomePage/>}/>
                    </Switch>
                </div>
                <BottomBar2 showSearch={false}/>
            </div>
        </Router>
    );
}