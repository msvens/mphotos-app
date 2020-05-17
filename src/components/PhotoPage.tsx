import React, {useEffect, useState} from 'react';
import {makeStyles, createStyles, Theme, Grid} from "@material-ui/core";
import {Photo} from "../types/photo";

import PhotosApi from "../services/api";
import PhotoDialog from "./PhotoDialog";
import PhotoNav from "./PhotoNav";


interface PhotoProps {
    id: string,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // flexGrow: 1,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            margin: 'auto'

        },
        img: {
            maxWidth: '100%',
            maxHeight: '100%',
            alignSelf: 'flex-start'
        },
        imgItem: {
            display: 'flex',
            // maxHeigh: 800,
            // height: 800,
            maxWidth: 1080,

        },
    }),
);

const PhotoPage: React.FC<PhotoProps> = ({ id }) => {

    const [photos, setPhotos] = useState<Photo[]> ([]);
    const [idx, setIdx] = useState<number> (0);
    const [open, setOpen] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const classes = useStyles();

    useEffect(() => {
        PhotosApi.isLoggedIn().then(res => setLoggedIn(res))
    },[]);

    useEffect(() => {
        const fetchData = async () => {
            await PhotosApi.getPhotos(0).then(res => {
                if(res.photos) {
                    console.log(res.length);
                    for (let i = 0; i < res.photos.length; i++) {
                        console.log(i);
                        if (res.photos[i].driveId === id) {
                            setIdx(i)
                        }
                    }
                    setPhotos(res.photos);
                }
            });
        };
        fetchData();
    }, [id]);

    const handleForward = () => {
        let newIdx = idx+1;
        if(newIdx >= photos.length)
            newIdx = 0;
        setIdx(newIdx);
    };
    const handleBackward = () => {
        let newIdx = idx-1;
        if(newIdx < 0)
            newIdx = photos.length - 1;
        setIdx(newIdx);
    };

    const setProfilePic = () => {
        PhotosApi.updateUser(undefined, undefined, photos[idx].fileName)
            .then(u => alert(u.pic))
            .catch(e => alert(e.toString()));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            {photos.length > 0 &&
            <Grid container alignItems="center" justify="space-around">
                <Grid item xs={12}>
                    <PhotoNav photo={photos[idx]}
                              onClickForward={handleForward}
                              onClickPrev={handleBackward}
                              isLoggedIn={loggedIn}
                              onClickProfile={setProfilePic}/>
                </Grid>
                <Grid item xs={12} className={classes.imgItem} justify="center">
                    <img className={classes.img} alt={photos[idx].title} src={PhotosApi.getImageUrl(photos[idx])} onClick={handleOpen}/>
                </Grid>
            </Grid>
            }
            {/*{photos.length > 0 &&*/}
            {/*    <PhotoDialog url={PhotosApi.getImageUrl(photos[idx])} openDialog={open} onClose={handleClose}/>*/}
            {/*}*/}
        </div>
    );
};

export default PhotoPage