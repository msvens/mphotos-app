import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import {
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Link as RouterLink} from "react-router-dom";
//import Link from "@material-ui/core/Link";
import MPIcon from "./common/MPIcon";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MonochromePhotosIcon from "@material-ui/icons/MonochromePhotos";
import PhotoAlbumOutlinedIcon from '@material-ui/icons/PhotoAlbumOutlined';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AppBar from "@material-ui/core/AppBar";
import React, {useContext, useState} from "react";
import {AuthContext} from "./MPhotosApp";
import AddGuestDialog from "./guest/AddGuestDialog";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            marginLeft: 0,
            marginRight: 0,
            backgroundColor: theme.palette.common.white
        },
        drawerList: {
            width: 250,
        },
        guestRoot: {
            marginLeft: 0,
            paddingLeft: theme.spacing(1),
            flexGrow: 1,
        },
        guestButton: {
            marginLeft: theme.spacing(2)
        },
        iconTitle: {
            //flexGrow:1,
            marginLeft: 0,
        },
        mpWordLogo: {
            maxWidth: 100,
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

        const [showAddGuest, setShowAddGuest] = useState<boolean>(false)

        if (context.isGuestLoading) {
            return (
                <div className={classes.guestRoot}>
                </div>
            )
        } else if (!context.isGuest) {
            return (
                <div className={classes.guestRoot}>
                    <Button variant="outlined" className={classes.guestButton} color="default" size={"small"}
                            startIcon={<PersonAddIcon/>} onClick={() => setShowAddGuest(true)}>Register Guest</Button>
                    <AddGuestDialog update={false} open={showAddGuest} onClose={() => {setShowAddGuest(false)}}/>
                </div>
            )
        } else {
            return (
                <div className={classes.guestRoot}>
                    <Typography variant={"body2"}>
                        Welcome {context.guest.name}
                    </Typography>
                </div>
            )
        }
    }

    const BurgerMenu: React.FC = () => {

        type Anchor = 'top' | 'left' | 'bottom' | 'right'

        const [state, setState] = useState({
            top: false,
            left: false,
            bottom: false,
            right: false,
        })

        const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setState({ ...state, [anchor]: open });
        }

        const menuList = (anchor: Anchor) => (
            <div className={classes.drawerList}
                role="presentation"
                onClick={toggleDrawer('right', false)}
                onKeyDown={toggleDrawer('right', false)}>

                <List>
                    <ListItem button key='Home' component={RouterLink} to="/">
                        <ListItemIcon><HomeOutlinedIcon/></ListItemIcon>
                        <ListItemText primary='Home'/>
                    </ListItem>
                    <ListItem button key='Photos' component={RouterLink} to="/photos">
                        <ListItemIcon><MonochromePhotosIcon/></ListItemIcon>
                        <ListItemText primary='Photos'/>
                    </ListItem>
                    <ListItem button key='Albums' component={RouterLink} to="/albums">
                        <ListItemIcon><PhotoAlbumOutlinedIcon/></ListItemIcon>
                        <ListItemText primary='Albums'/>
                    </ListItem>
                    <ListItem button key='Guest' component={RouterLink} to="/guest">
                        <ListItemIcon>{context.isGuest ? <PersonIcon/> : <PersonAddIcon/>}</ListItemIcon>
                        <ListItemText primary={context.isGuest ? 'Guest' : 'Add Guest'}/> :
                    </ListItem>
                </List>
            </div>
        );

        return (
            <>
                <IconButton edge="start" aria-label="menu" onClick={toggleDrawer("right", true)}>
                    <MenuIcon fontSize="large"/>
                </IconButton>

                <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
                    {menuList('right')}
                </Drawer>
            </>
        )
    }

    return (
        <AppBar className={classes.appBar} position="sticky" color={'transparent'} elevation={0}>
            <Toolbar style={{paddingLeft: 0, paddingRight: 0}}>
                <Box className={classes.iconTitle}>
                    <IconButton aria-label="home" color="inherit" component={RouterLink} to="/">
                        <MPIcon key="topLogo" mpcolor="white" fontSize="large"/>
                    </IconButton>
                </Box>
                <Hidden xsDown>
                        <Typography variant={"body2"} component={'span'}>
                            <Box letterSpacing={2}>
                            MELLOWTECH<br/>
                            PHOTOS
                            </Box>
                        </Typography>
                </Hidden>
                {props.showSearch &&
                    <Hidden xsDown>
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
                    </Hidden>
                }
                <div className={classes.grow}/>
                <Hidden smDown>
                    <IconButton aria-label="home" color="inherit" component={RouterLink} to="/">
                        <HomeOutlinedIcon fontSize="large"/>
                    </IconButton>
                    <IconButton aria-label="photos" color="inherit" component={RouterLink} to="/photos">
                        <MonochromePhotosIcon fontSize={"large"}/>
                    </IconButton>
                    <IconButton aria-label="albums" color="inherit" component={RouterLink} to="/albums">
                        <PhotoAlbumOutlinedIcon fontSize={"large"}/>
                    </IconButton>
                    <IconButton aria-label="guest" color="inherit" component={RouterLink} to="/guest">
                        {context.isGuest ? <PersonIcon fontSize={"large"}/> : <PersonAddIcon fontSize={"large"}/>}
                    </IconButton>
                </Hidden>
                <Hidden mdUp>
                    <BurgerMenu/>
                </Hidden>
            </Toolbar>
            <Divider/>
        </AppBar>
    );
}