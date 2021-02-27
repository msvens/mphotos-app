import React, {useContext} from "react";
import {Button, Snackbar, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PhotosApi from "../common/api";
import {MPContext} from "../App";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginBottom: theme.spacing(4)
        },
    }),
);

const Login: React.FC = () => {
    const classes = useStyles();
    const [password, setPassword] = React.useState("")
    const [alert, setAlert] = React.useState(false)
    const context = useContext(MPContext)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        PhotosApi.login(password).then(res => context.checkUser()).catch(err => setAlert(true))
    }

    return (
        <>
            <Snackbar anchorOrigin={{vertical:'top', horizontal:'center'}} open={alert} autoHideDuration={6000} onClose={() => setAlert(false)}>
                <Alert onClose={() => setAlert(false)} severity="error">
                    Incorrect Password
                </Alert>
            </Snackbar>
            <Typography paragraph>Login to edit settings</Typography>
                <TextField className={classes.textField}
                           id="loginField"
                           label="password"
                           fullWidth
                           size="medium"
                           margin="normal"
                           name="password"
                           value={password}
                           variant="outlined"
                           onChange={handleChange}/>
                <Button onClick={handleLogin} variant="contained" color="primary" type="submit">Submit</Button>
        </>
    )
}

export default Login