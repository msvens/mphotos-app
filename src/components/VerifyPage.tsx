import React, {useEffect, useState} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import PhotosApi, {Guest} from "../services/api";
import {Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";

interface VerifyPageProps {
    query?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            paddingLeft: 0,
            margin: 'auto',
        },
    }),
);

const VerifyPage: React.FC<VerifyPageProps> = ({query}) => {

    const classes = useStyles()
    const [verified, setVerified] = useState<boolean> (false)
    const [guest, setGuest] = useState<Guest>()

    useEffect(() => {
        if(query) {
            PhotosApi.verifyGuest(query).then(res => {
                    setVerified(res)
                    if (res) {
                        PhotosApi.getGuest().then(res1 => {
                            setGuest(res1)
                        })
                    }
                }).catch(err => alert("Error verifying guest "))
            }
    }, [query])

    return (
        <div className={classes.root}>
            {!query &&
                <Typography variant="body2" gutterBottom={true}>
                    No Query provided, cannot verify guest
                </Typography>
            }
            {verified && guest &&
            <>
                <Typography variant="h4">Welcome To Mellowtech!</Typography>
                <Typography variant="body2" gutterBottom={true}>
                    As a guest at mellowtech you can comment and like photos!<br/>
                    To change your guest name or email go here: XXX. You are registered as
                    <ul>
                        <li><b>Name</b>: {guest.name}</li>
                        <li><b>Email</b>: {guest.email}</li>
                    </ul>
                </Typography>
                <Typography variant={"subtitle1"}>
                    Continue to <Link component={RouterLink} to={'/photos'}>individual Photos</Link><br/>
                    Continue to <Link component={RouterLink} to={'/'}>photo grid</Link>
                </Typography>
            </>
            }
        </div>
    )

}

export default VerifyPage

