import React from 'react';

import {Box, createStyles, Link, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ReactComponent as LogoWhite} from '../common/mp_logo_white.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
        },
        paper: {
            maxWidth: 700,
            width: 700,
            padding: theme.spacing(2)
        }
    }),
);

export default function AboutPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.paper}>
                <Box width={200} marginLeft={"auto"} marginRight={"auto"} marginBottom={5}>
                    <LogoWhite/>
                </Box>
                <Typography variant="body1" paragraph>
                    Mellowtech Photos is my personal photoblog. It also serves as the homepage for mellowtech
                    (<Link href={"#mellowtech"}>see below</Link>)
                    There are a lot of photo blogs out there - instagram, flickr, photobucket, etc. None, however
                    did what I exactly wanted. Namely to
                    <ul>
                        <li>Take full advantage of exif information stored typically in your jpegs</li>
                        <li>All editing (including meta information) done in lightroom</li>
                        <li>Offer a tight integration with Google Drive</li>
                    </ul>
                </Typography>
                <Typography variant="h5">Technical Detail</Typography>
                <Typography variant="body1" paragraph gutterBottom>
                This website uses Go for the backend and React as its frontend. You can find the code in the following
                projects
                <ul>
                    <li><Link href="https://www.github.com/msvens/mphotos">mphotos</Link> - backend service</li>
                    <li><Link href="https://www.github.com/msvens/mphotos-app">mphotos-app</Link> - react frontend</li>
                    <li><Link href="https://www.github.com/msvens/mdrive">mdrive</Link> - simplified google drive access</li>
                    <li><Link href="https://www.github.com/msvens/mexif">mexif</Link> - extract exif information from images</li>
                </ul>
                </Typography>
                <Typography variant="body1" paragraph={true} gutterBottom={true} >
                    A big thanks to the following libraries and tools that made this project possible:
                    <ul>
                        <li><Link href="https://reactjs.org/docs/create-a-new-react-app.html">react-app</Link></li>
                        <li><Link href="https://material-ui.com">material-ui</Link></li>
                        <li><Link href="https://exiftool.org">exiftool</Link></li>
                        <li><Link href="https://libvips.github.io/libvips/API/current/Using-vipsthumbnail.md.html">libvips</Link></li>
                        <li><Link href="https://github.com/gorilla/mux">gorilla mux</Link></li>
                        <li><Link href="https://github.com/gorilla/sessions">gorialla sessions</Link></li>
                    </ul>

                </Typography>
                <Typography variant="h4" id={"mellowtech"}>Mellowtech</Typography>
                <Typography variant="body1" paragraph>
                    mellowtech came into existence back in 2002 when Martin Svensson and Rickard Cöster
                    (then 2 phd studends) decided to start a software company. A great deal of time was spent on finding
                    a good name, in the end we ended up with mellow - we thought it captured what we were about.
                    A lot of relaxing and at the same time producing solid (actually another name we had in mind)
                    and mature code. As with many other grand ideas running a company while doing your phd did not
                    turn out to be the best of ideas, especially since we mostly wanted to create cool stuff.
                    <p>
                        In the end one the company died but the idea of mellowtech prevailed. It has been a playground
                        for fiddling with things such as, disc based search and sort, key-value stores, social graphs,
                        oauth & openid and blog sofware. Some of it has lived for a very long time while other stuff
                        have been developed recently.
                    </p>
                </Typography>
            </div>
        </div>
    );
}