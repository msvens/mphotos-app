import React, {useEffect, useState} from 'react';
import {makeStyles, createStyles, Theme, Grid, Typography} from "@material-ui/core";
import {Photo} from "../types/photo";

import PhotosApi from "../services/api";
import PhotoNav from "./PhotoNav";


interface PhotoProps {
    id: string,
    query?: string
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

const PhotoPage: React.FC<PhotoProps> = (props: PhotoProps) => {

    const [photos, setPhotos] = useState<Photo[]> ([]);
    const [, updateState] = React.useState();
    const [idx, setIdx] = useState<number> (0);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const classes = useStyles();

    useEffect(() => {
        PhotosApi.isLoggedIn().then(res => setLoggedIn(res))
    },[]);

    useEffect(() => {
        const fetchData = async () => {
            if(props.query) {
                await PhotosApi.searchPhotos(props.query).then(res => {
                    if(res.photos) {
                        setIdx(0);
                        setPhotos(res.photos);
                    }
                });
            } else {
                await PhotosApi.getPhotos(1000).then(res => {
                    if(res.photos) {
                        for (let i = 0; i < res.photos.length; i++) {
                            console.log(i);
                            if (res.photos[i].driveId === props.id) {
                                setIdx(i)
                            }
                        }
                        setPhotos(res.photos);
                    }
                });
            }

        };
        fetchData();
    }, [props.id, props.query]);

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

    const parseFilter = () => {
        var ret = ""
        if(props.query) {
            const parsed = new URLSearchParams(props.query);
            for (let entry of Array.from(parsed.entries())) {
                let key = entry[0];
                let value = entry[1];
                ret = ret + key + " = " + value
            }
            //return "Camera Model = "+parsed.get("cameraModel")
        }
        return ret
    }

    const setProfilePic = () => {
        PhotosApi.updateUserPic(photos[idx].fileName)
            .then(u => alert(u.pic))
            .catch(e => alert(e.toString()));
    };

    const updatePhoto = (title: string, description: string, keywords: string) => {
        const driveId = photos[idx].driveId
        PhotosApi.updatePhoto(driveId, title, description, keywords)
            .then(p => {
                photos[idx] = p;
                updateState({})
            })
            .catch(e => alert(e.toString()))
    }

    const deletePhoto = (removeFiles: boolean) => {
        const driveId = photos[idx].driveId
        PhotosApi.deletePhoto(driveId, removeFiles)
            .then(p => {
                var newPhotos = photos.filter(obj => obj.driveId !== driveId)
                setPhotos(newPhotos)
                if(idx >= newPhotos.length) {
                    setIdx(0)
                }
                alert(p.driveId+" was deleted")
            })
            .catch(e => alert(e.toString()))
    }

    return (
        <div className={classes.root}>
            {photos.length > 0 &&
            <Grid container alignItems="center" justify="space-around">
                {props.query &&
                    <Grid item xs={12} justify="center">
                        <Typography variant="body2" align="center" color={'textSecondary'}>
                        Filter: {parseFilter()}
                        </Typography>
                    </Grid>
                }
                <Grid item xs={12}>
                    <PhotoNav photo={photos[idx]}
                              onClickForward={handleForward}
                              onClickPrev={handleBackward}
                              isLoggedIn={loggedIn}
                              onClickProfile={setProfilePic}
                              onDelete={deletePhoto}
                              onUpdatePhoto={updatePhoto}/>
                </Grid>
                <Grid item xs={12} className={classes.imgItem} justify="center">
                    <img className={classes.img} alt={photos[idx].title} src={PhotosApi.getImageUrl(photos[idx])}/>
                </Grid>
            </Grid>
            }
        </div>
    );
};

export default PhotoPage