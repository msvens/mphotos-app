import React, {useContext, useEffect, useState} from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import PhotosApi from "../common/api";
import {Button, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import {MPContext} from "../App";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddGuestDialog from "./AddGuestDialog";
import MPDialog from "../common/MPDialog";

interface GuestPageProps {
    query?: string
}

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
        },
        guestButton: {
            marginTop: theme.spacing(4),
            marginRight: theme.spacing(2)
        },
    }),
);

const GuestPage: React.FC<GuestPageProps> = ({query}) => {

    const classes = useStyles()
    const [verified, setVerified] = useState<boolean>(false)
    const [showAddGuest, setShowAddGuest] = useState<boolean>(false)
    const [showLogoutGuest, setShowLogoutGuest] = useState<boolean>(false)
    const context = useContext(MPContext)

    useEffect(() => {
        if (query) {
            PhotosApi.verifyGuest(query).then(res => {
                setVerified(res)
                if (res) {
                    context.checkGuest()
                }
            }).catch(err => alert("Error verifying guest "))
        }
    }, [query, context])

    const handleLogout = () => {
        const logout = async () => {
            try {
                await PhotosApi.logoutGuest()
                context.checkGuest()
                setShowLogoutGuest(false)
            } catch (error) {
                alert(error)
            }
        }
        logout()
    }


    return (
        <div className={classes.root}>
            <div className={classes.paper}>
                {query && verified && context.isGuest &&
                <>
                    <Typography variant="h6">Thank you for verifying!</Typography>
                    <Typography variant="body2" gutterBottom={true}>
                        As a guest at mellowtech you can comment and like photos!<br/>
                        To change your guest name or email go to your <Link component={RouterLink} to={'/guest'}>guest page</Link>.
                        You are registered as
                        <ul>
                            <li><b>Name</b>: {context.guest.name}</li>
                            <li><b>Email</b>: {context.guest.email}</li>
                        </ul>
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        Continue to <Link component={RouterLink} to={'/photos'}>individual Photos</Link><br/>
                        Continue to <Link component={RouterLink} to={'/'}>photo grid</Link>
                    </Typography>
                </>
                }
                {!query && context.isGuest &&
                <>
                    <Typography variant="h6">Welcome back {context.guest.name}!</Typography>
                    <Typography variant={"body1"} gutterBottom>
                        If you want to update your name or register a new Guest you can do so from
                        here by clicking the update button below.
                    </Typography>
                    <Typography variant={"body1"} gutterBottom>
                        Your guest account is tied to your email address and as long as you
                        register with the same email you can change your name.
                    </Typography>
                    <Typography variant={"body1"} gutterBottom>
                        If you want to register/sign in with a different user make sure to use a
                        different name and email
                    </Typography>
                    <Button variant="outlined" color="default" size={"small"} className={classes.guestButton}
                            startIcon={<PersonAddIcon/>} onClick={() => setShowAddGuest(true)}>Update Guest</Button>
                    <Button variant="outlined" color="default" size={"small"} className={classes.guestButton}
                            onClick={() => setShowLogoutGuest(true)}>Logout Guest</Button>
                    <MPDialog open={showLogoutGuest} onClose={() => setShowLogoutGuest(false)}
                              onOk={handleLogout} closeOnOk={false} title={"Logout Guest"}
                              text={"Logout guest. In order to login again you need to register with your email."}/>

                </>
                }
                {!query && !context.isGuest &&
                <>
                    <Typography variant={"h6"}>Register Guest</Typography>
                    <Typography variant={"body1"}>
                        In order to be able to comment and like photos you need to register as a guest by providing
                        a nickname and your email address. You will get at a verification email sent to your provided
                        email.
                    </Typography>
                    <Button variant="outlined" color="default" size={"small"} className={classes.guestButton}
                            startIcon={<PersonAddIcon/>} onClick={() => setShowAddGuest(true)}>Register Guest</Button>
                </>
                }
                <AddGuestDialog update={context.isGuest} name={context.guest.name} email={context.guest.email} open={showAddGuest} onClose={() => {setShowAddGuest(false)}}/>
            </div>
        </div>
    )

}

export default GuestPage

