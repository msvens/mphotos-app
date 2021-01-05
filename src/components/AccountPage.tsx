import React, {useContext, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Box, Button, Container, List, ListItem, ListItemText, Typography
} from "@material-ui/core";

import PhotosApi from "../services/api";
import Profile from "./Profile";
import Drive from "./Drive";
import Login from "./Login";
import UXConfigDialog from "./UXConfigDialog";
import {AuthContext} from "./MPhotosApp";

const PROFILE = 'Profile';
const DRIVE = 'Drive';
const LOGOUT = 'Logout';
const UXCONFIG = 'UX Config'

type MenuItems = 'Profile' | 'Drive' | 'Logout' | 'UX Config';

const Items:MenuItems[] = [PROFILE, DRIVE, UXCONFIG, LOGOUT];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            maxWidth: 1000,
            margin: 'auto',
        },
        drawer: {
            minWidth: 140,
            flexShrink: 0,
        },
        content: {
            flexGrow: 1,
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
    }),
)

export default function AccountPage() {
    const classes = useStyles()
    const [mi, setItem] = useState<MenuItems> (PROFILE)
    const context = useContext(AuthContext)

    const handleLogin = (password: string) => {
        PhotosApi.login(password).then(res => context.checkUser())
    }

    const handleLogout = async (e: React.MouseEvent) =>  {
        e.preventDefault();
        PhotosApi.logout().then(res => {
            alert(res.authenticated)
            context.checkUser()
        }).catch(e => alert(e));
    };

    return (
        <div className={classes.root}>
            <Box className={classes.drawer} component={"span"} borderRight={1}>
                <List>
                    {Items.map((item, idx) => (
                        <ListItem button key={item} onClick={_ => setItem(item)}>
                            <ListItemText primary={item} primaryTypographyProps={{ variant: "h6"}}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <main className={classes.content}>
               {!context.isUser && <Login submitHandler={handleLogin}/>}
               {context.isUser && mi === PROFILE && <Profile />}
               {context.isUser && mi === DRIVE && <Drive />}
                {context.isUser && mi === UXCONFIG && <UXConfigDialog/>}
               {context.isUser && mi === LOGOUT &&
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