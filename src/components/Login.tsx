import React from "react";
import {Button, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginBottom: theme.spacing(4)
        },
    }),
);

export interface LoginProps {
    submitHandler: (password: string) => void
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
    const classes = useStyles();
    const [password, setPassword] = React.useState();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.submitHandler(password);
    };

    return (
        <>
            <Typography paragraph>Login to edit settings</Typography>
            <form onSubmit={handleSubmit}>
                <TextField className={classes.textField}
                           id="loginField"
                           label="password"
                           fullWidth
                           size="medium"
                           margin="normal"
                           name="password"
                           value={password}
                           variant="outlined"
                           onChange={handleChange}
                />
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </>
    )
};

export default Login