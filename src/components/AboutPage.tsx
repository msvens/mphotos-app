import React from 'react';

import {createStyles, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
        },
        paper: {
            width: 800,
            padding: "1em"
        }
    }),
);

export default function AboutPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={1}>
                <Typography variant="h4">About</Typography>
                <Typography variant="body1" paragraph>
                    Mellowtech Photos is my personal photoblog. It also serves as the homepage for mellowtech (see below)
                    There are a lot of photo blogs out there - instagram, flickr, photobucket, etc. None, however
                    did what I exactly wanted. Namely to
                    <ul>
                        <li>Take full advantage of exif information stored typically in your jpegs</li>
                        <li>Offer a tight integration with Lightroom</li>
                        <li>Offer a tight integration with Google Drive</li>
                        <li>Fully automated process from Lightroom to Website</li>
                    </ul>
                    Full automation is difficult to achieve so I settled with the following goals:
                    <ol>
                        <li>I should be able to edit my photos in lightroom such that all meta information (exif, etc)
                            will be automatically rendered on my photoblog, e.g. title, keywords, camera make, etc
                        </li>
                        <li>I should be able to connect to a specifc Google drive folder where I upload images my images
                        that will be automatically pulled to my photoblog</li>
                    </ol>
                    <i>As it turns out one can also automate the lightroom to google drive process</i>
                    <p>
                        So my workflow (if successfull) would be something like this. Import to lightroom. Edit photo.
                        Publish photo to a specific google drive folder. Regularly pull photos from the google drive
                        folder to the website. <i>The only manual steps are the photo editing and publish step</i>
                    </p>
                </Typography>
                <Typography variant="h5">Technical Details</Typography>
                <Typography variant="body1" paragraph gutterBottom>
                </Typography>
                <Typography variant="h4">Mellowtech</Typography>
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
            </Paper>
        </div>
    );
}