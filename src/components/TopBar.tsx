import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import {Box, Button, Divider} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import MPIcon from "./MPIcon";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MonochromePhotosIcon from "@material-ui/icons/MonochromePhotos";
import PhotoAlbumOutlinedIcon from '@material-ui/icons/PhotoAlbumOutlined';
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import AppBar from "@material-ui/core/AppBar";
import React, {useContext} from "react";
import {AuthContext} from "./MPhotosApp";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            marginLeft: 0,
            marginRight: 0,
            backgroundColor: theme.palette.common.white
        },
        guestRoot: {
            marginLeft: 0,
            paddingLeft: theme.spacing(1),
            flexGrow: 1,
        },
        guestButton: {
            marginLeft: theme.spacing(3)
        },
        iconTitle: {
            //flexGrow:1,
            marginLeft: 0,
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

interface TobBarProps {
    showSearch: boolean
}

export default function TopBar(props: TobBarProps) {
    const classes = useStyles()
    const context = useContext(AuthContext)

    const GuestBar: React.FC = () => {

        if (context.isGuestLoading) {
            return (
                <div className={classes.guestRoot}>
                </div>
            )
        } else if (!context.isGuest) {
            return (
                <div className={classes.guestRoot}>
                    Guest: not registered
                    <Button className={classes.guestButton}>Register</Button>
                </div>
            )
        } else {
            return (
                <div className={classes.guestRoot}>
                    Guest: {context.guest.name}
                    <Button className={classes.guestButton} onClick={() => context.checkGuest()}>Update</Button>
                </div>
            )
        }

    }

    return (
        <AppBar className={classes.appBar} position="sticky" color={'transparent'} elevation={0}>
            <Toolbar style={{paddingLeft: 0, paddingRight: 0}}>
                <Box className={classes.iconTitle}>
                    <IconButton aria-label="home" color="inherit" component={Link} to="/">
                        <MPIcon key="topLogo" mpcolor="white" fontSize="large"/>
                    </IconButton>
                </Box>
                <GuestBar/>
                {props.showSearch &&
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
                <div className={classes.grow}/>
                <IconButton aria-label="home" color="inherit" component={Link} to="/">
                    <HomeOutlinedIcon fontSize="large"/>
                </IconButton>
                <IconButton aria-label="photos" color="inherit" component={Link} to="/photos">
                    <MonochromePhotosIcon fontSize={"large"}/>
                </IconButton>
                <IconButton aria-label="albums" color="inherit" component={Link} to="/albums">
                    <PhotoAlbumOutlinedIcon fontSize={"large"}/>
                </IconButton>
                <IconButton aria-label="login" color="inherit" component={Link} to="/login">
                    <AccountBoxOutlinedIcon fontSize={"large"}/>
                </IconButton>
            </Toolbar>
            <Divider/>
        </AppBar>
    );
}