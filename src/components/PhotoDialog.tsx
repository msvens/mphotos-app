import React from 'react';
import {createStyles, Dialog, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogContent: {
            backgroundColor: theme.palette.common.black,
            padding: 0,
            margin: 0,
            border: 0
        },
        img: {
            borderColor: theme.palette.common.black,
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }),
);

interface PhotoDialogProps {
    url: string,
    openDialog: boolean,
    onClose: () => void
}


const PhotoDialog: React.FC<PhotoDialogProps> = (props: PhotoDialogProps) => {

    const classes = useStyles();

    return (
        <div>
            <Dialog open={props.openDialog} onClose={props.onClose} maxWidth="lg">
                <img alt={props.url} className={classes.img} src={props.url} onClick={props.onClose}/>
                {/*<DialogContent className={classes.dialogContent} >
                    <img className={classes.img} src={props.url} onClick={props.onClose}/>
                </DialogContent>*/}
            </Dialog>
        </div>
    );
};

export default PhotoDialog;