import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AboutPage from "./AboutPage";
import AccountPage from "./AccountPage";
import HomePage from "./HomePage";
import 'typeface-roboto';
import {BrowserRouter as Router, Route, RouteComponentProps, Switch} from "react-router-dom";
import TopBar from "./TopBar";
import PhotoPage2 from "./PhotoPage2";
import ResumePage from "./ResumePage";
import AlbumPage from "./AlbumPage";
import {Guest, PhotoType, User} from "../services/api";
import BottomBar2 from "./BottomBar2";
import VerifyPage from "./VerifyPage";
import ScrollToTop from "./ScrollIntoView";
import {useGuest, useUser} from "../services/hooks";


interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

interface IAuthContext {
    isGuest: boolean
    guest: Guest
    isGuestLoading: boolean
    checkGuest: () => void
    isUser: boolean
    user: User
    checkUser: () => void
}

const dummyContext: IAuthContext = {
    isGuest: false,
    isGuestLoading: false,
    guest: {
        name: "",
        email: ""
    },
    checkGuest: () => {alert("dummy")},
    isUser: false,
    user: {
        name: "",
        bio: "",
        pic: ""
    },
    checkUser: () => {alert("dummy")}
}

export const AuthContext = React.createContext<IAuthContext>(dummyContext)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 0,
            minHeight: '100vh',
        },
        content: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            flexGrow: 1,
            backgroundColor: theme.palette.grey["50"],

        },
    }),
);



export default function MPhotosApp() {
    const classes = useStyles()

    const [isGuest, guest, isGuestLoading, checkGuest] = useGuest()
    const [isUser, user, checkUser] = useUser()

    const defaultContext: IAuthContext = {
        isGuest: isGuest,
        guest: guest,
        isGuestLoading: isGuestLoading,
        checkGuest: checkGuest,
        isUser: isUser,
        user: user,
        checkUser: checkUser
    }

    return (
        <AuthContext.Provider value={defaultContext}>
        <Router>
            <ScrollToTop/>
            <div className={classes.root}>
                <TopBar showSearch={false}/>
                <div className={classes.content} id="contentPage">
                    <Switch>
                        <Route path="/albums/:id" render={({match}: MatchProps) => (
                            <PhotoPage2 photoType={PhotoType.Dynamic} albumName={match.params.id}/>)}/>
                        <Route path="/albums" render={() => <AlbumPage/>}/>
                        <Route path="/resume" render={() => <ResumePage/>}/>
                        <Route path="/photos" render={() => <PhotoPage2 photoType={PhotoType.Dynamic} id=""/>}/>
                        <Route path="/about" render={() => <AboutPage/>}/>
                        <Route path="/login" render={() => <AccountPage/>}/>
                        <Route path={"/photo/:id"} render={({match}: MatchProps) => (
                            <PhotoPage2 photoType={PhotoType.Dynamic} id={match.params.id}/>)}/>
                        <Route path="/search" render={(props: RouteComponentProps) => {
                            return <PhotoPage2 photoType={PhotoType.Dynamic} query={props.location.search}/>
                        }}/>
                        <Route path="/verify" render={(props: RouteComponentProps) => {
                            return <VerifyPage query={props.location.search}/>
                        }}/>
                        <Route path="/" render={() => <HomePage/>}/>
                    </Switch>
                </div>
                {/*<BottomBar/>*/}
                <BottomBar2 showSearch={false}/>
            </div>
        </Router>
        </AuthContext.Provider>
    );
}