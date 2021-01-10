import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import {Divider, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import React from "react";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            marginLeft: 0,
            marginRight: 0,
            backgroundColor: theme.palette.common.white,
            top: 'auto',
            bottom: 0,
        },
        linkText: {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            fontSize: '80%'
        }
    }),
);

interface BottomBarProps {
    showSearch: boolean
}

export default function BottomBar2(props: BottomBarProps) {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="relative" color={'transparent'} elevation={0}>
            <Divider/>
            <Toolbar style={{paddingLeft:0, paddingRight:0, marginRight: "auto", marginLeft: "auto"}}>
                <Typography variant="body1">
                    <Link className={classes.linkText} component={RouterLink} to={`/about`}>About</Link>
                    <Link className={classes.linkText} component={RouterLink} to={`/resume`}>Resume</Link>
                    <Link className={classes.linkText} component={RouterLink} to={'/'}>mellowtech.org</Link>
                    <Link className={classes.linkText} component={RouterLink} to={'/login'}>Admin</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}