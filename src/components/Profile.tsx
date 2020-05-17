import React, {useEffect} from "react";
import PhotosApi from "../services/api";
import {Button, TextField} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginBottom: theme.spacing(4)
        },
    }),
);

const Profile: React.FC = () => {
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [pic, setPic] = React.useState('');

    useEffect(() => {
        PhotosApi.getUser()
            .then(u => {
                setName(u.name);
                setBio(u.bio);
                setPic(u.pic);
            })
    },[]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBio(event.target.value);
    };
    const handlePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPic(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>  {
        e.preventDefault();
        PhotosApi.updateUser(name, bio, pic)
            .then(u => {
                setName(u.name);
                setBio(u.bio);
                setPic(u.pic);
            })
            .catch(err => alert(err.toString()))
    };

    return (

        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <TextField id="nameField" label="Name" size="medium" margin="normal" variant="outlined"
                           value={name} onChange={handleNameChange} fullWidth/>

                <TextField id="picField" label="Profile Picture" variant="outlined" margin="normal"
                           value={pic} onChange={handlePicChange} fullWidth/>

                <TextField className={classes.textField} id="bioField" label="BioDialog" multiline rows={4}
                           size="medium" margin="normal" variant="outlined"
                           value={bio} onChange={handleBioChange} fullWidth/>

                <Button variant="outlined" type="submit">Submit</Button>
            </form>
        </React.Fragment>
    )
};

export default Profile;