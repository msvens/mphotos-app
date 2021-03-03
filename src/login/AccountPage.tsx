import React, {useContext, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Box, Button, List, ListItem, ListItemText, Typography
} from "@material-ui/core";

import PhotosApi from "../common/api";
import Profile from "./Profile";
import Login from "./Login";
import UXConfigDialog from "./UXConfigDialog";
import {MPContext} from "../App";
import Drive from "./Drive";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const PROFILE = 'profile';
const DRIVE = 'drive';
const LOGOUT = 'logout';
const UXCONFIG = 'uxconfig'

type MenuItems = 'Profile' | 'Drive' | 'Logout' | 'UX';

const MenuItems = new Map<string,string>([
    [PROFILE, "Profile"],
    [DRIVE, "Drive"],
    [UXCONFIG, "UX Config"],
    [LOGOUT, "Logout"],
    ]
)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            maxWidth: 1000,
            margin: 'auto',
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(2),
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
    const {setting} = useParams()
    const classes = useStyles()
    const context = useContext(MPContext)


    const handleLogout = async (e: React.MouseEvent) => {
        PhotosApi.logout().then(res => {
            context.checkUser()
        }).catch(e => alert("check user: "+e));
    };


    return (
        <div className={classes.root}>
            <Box className={classes.drawer} component={"span"} borderRight={1}>
                <List>
                    {Array.from(MenuItems.entries()).map((entry, idx) => (
                        <ListItem key={entry[0]} button component={Link} to={`/login/${entry[0]}`}>
                            <ListItemText primary={entry[1]} primaryTypographyProps={{variant: "h6"}}/>
                        </ListItem>
                    ))}
                    {/*{MenuItems.forEach((key, value) => (
                        <ListItem button component={Link} to={`/login/${key}`}>
                            <ListItemText primary={key} primaryTypographyProps={{variant: "h6"}}/>
                        </ListItem>
                    ))}*/}
                    {/*{MenuItems.map((item, idx) => (
                        <ListItem button component={Link} to={`/login/${item.toLowerCase()}`}>
                            <ListItemText primary={item} primaryTypographyProps={{variant: "h6"}}/>
                        </ListItem>
                    ))}*/}
                </List>
                {/*<List>
                    {Items.map((item, idx) => (
                        <ListItem button key={item} onClick={_ => setItem(item)}>
                            <ListItemText primary={item} primaryTypographyProps={{ variant: "h6"}}/>
                        </ListItem>
                    ))}
                </List>*/}
            </Box>
            <main className={classes.content}>
                {!context.isUser && <Login/>}
                {context.isUser && setting === undefined && <Profile/>}
                {context.isUser && setting === PROFILE && <Profile/>}
                {context.isUser && setting === DRIVE && <Drive/>}
                {context.isUser && setting === UXCONFIG && <UXConfigDialog/>}
                {context.isUser && setting === LOGOUT &&
                <Box>
                    <Typography paragraph>
                        By Logging out you will no longer be able to upload pictures, etc.
                    </Typography>
                    <Button variant="outlined" onClick={handleLogout}>Logout Now</Button>
                </Box>
                }
            </main>
        </div>
    );
}