import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import React from "react";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            paddingLeft: theme.spacing(2),
            paddingTop: theme.spacing(6),
            paddingRight: theme.spacing(2),
        },
        linkText: {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            fontSize: '80%'

        }
    })
);

interface BottomBarProps {
    showSearch: boolean
}

export default function BottomBar(props: BottomBarProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="body1">
                <Link className={classes.linkText} component={RouterLink} to={`/about`}>About</Link>
                <Link className={classes.linkText} component={RouterLink} to={`/resume`}>Resume</Link>
                <Link className={classes.linkText} component={RouterLink} to={'/'}>mellowtech.org</Link>
            </Typography>
        </div>
    );
}