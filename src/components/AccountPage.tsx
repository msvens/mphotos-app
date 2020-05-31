import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Box, Button, Container, List, ListItem, ListItemText, Typography
} from "@material-ui/core";

import PhotosApi from "../services/api";
import Profile from "./Profile";
import Drive from "./Drive";
import Login from "./Login";


const drawerWidth = 240;

const PROFILE = 'Profile';
const DRIVE = 'Drive';
const LOGOUT = 'Logout';

type MenuItems = 'Profile' | 'Drive' | 'Logout';

const Items:MenuItems[] = [PROFILE, DRIVE, LOGOUT];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            maxWidth: 1000,
            margin: 'auto',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        divider:  {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        content: {
            flexGrow: 1,
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        textField: {
            marginBottom: theme.spacing(4)
        },
        textFieldLabel: {
            fontSize: theme.typography.body1.fontSize
        }
    }),
);

const LogoutForm: React.FC = () => {
    return (
        <Container>
            <Typography paragraph>
                By Logging out you will no longer be able to upload pictures, etc.
            </Typography>
            <Button variant="contained" color="primary">Logout Now</Button>
        </Container>
    )
};




export default function AccountPage() {
    const [mi, setItem] = useState<MenuItems> (PROFILE);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const classes = useStyles();

    useEffect(() => {
        PhotosApi.isLoggedIn().then(res => setLoggedIn(res))
    },[]);

    const handleLogin = (password: string) => {
        PhotosApi.login(password).then(res => setLoggedIn(res.authenticated));
    };

    const handleLogout = async (e: React.MouseEvent) =>  {
        e.preventDefault();
        alert("before logout");
        PhotosApi.logout().then(res => {
            alert(res.authenticated);
            setLoggedIn(res.authenticated)
        }).catch(e => alert(e));
    };

    return (
        <div className={classes.root}>
            <Box className={classes.drawer} component={"span"} borderRight={1}>
                <Typography variant={"h5"}>Settings</Typography>
                <List>
                    {Items.map((item, idx) => (
                        <ListItem button key={item} onClick={_ => setItem(item)}>
                            <ListItemText primary={item} primaryTypographyProps={{ variant: "h6"}}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <main className={classes.content}>
               {!loggedIn && <Login submitHandler={handleLogin}/>}
               {loggedIn && mi === PROFILE && <Profile />}
               {loggedIn && mi === DRIVE && <Drive />}
               {loggedIn && mi === LOGOUT &&
               <Container>
                   <Typography paragraph>
                       By Logging out you will no longer be able to upload pictures, etc.
                   </Typography>
                   <Button variant="outlined" onClick={handleLogout}>Logout Now</Button>
               </Container>
               }
            </main>
        </div>
    );
}