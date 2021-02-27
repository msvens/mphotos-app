import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import {Box, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import React, {useContext} from "react";
import {MPContext} from "./App";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            marginLeft: 0,
            marginRight: 0,
            top: 'auto',
            bottom: 0,
        },
        grow: {
            flexGrow: 1,
        },
        linkText: {
            textTransform: 'uppercase',
            margin: 0,
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
    const context = useContext(MPContext)

    function link(to: string, name: string) {
        return (
            <Link className={classes.linkText} color={"inherit"} style={{ textDecoration: 'none' }}
                  component={RouterLink} to={to}>
                <Typography variant="caption" gutterBottom={false}>
                    <Box className={classes.linkText}>{name}</Box>
                </Typography>
            </Link>
        )
    }

    return (
        <AppBar className={classes.appBar} position="relative" color={'transparent'} elevation={0}>
            {/*<Divider/>*/}
            <Toolbar style={{paddingLeft:0, paddingRight:0}}
                     variant={context.uxConfig.denseBottomBar ? "dense" : "regular"}>
                <div className={classes.grow}/>
                {link("/about", "ABOuT")}
                {link("/resume", "RESUME")}
                {link("/", "MELLOWTECH.ORG")}
                {link("/login", "ADMIN")}
                <div className={classes.grow}/>
            </Toolbar>
        </AppBar>
    );
}