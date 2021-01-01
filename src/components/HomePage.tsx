import React, {useEffect, useState} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import BioDialog from "./BioDialog";
import InfinitePhotoGrid from "./InfinitePhotoGrid";
import PhotosApi, {UXConfig} from "../services/api";

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

export default function HomePage() {
    const classes = useStyles();


    const [config, setConfig] = useState<UXConfig>(PhotosApi.defaultUxConfig);
    useEffect(() => {
        PhotosApi.getUXConfig().then(res => {
            setConfig(res)
        })
    }, []);

    return (
        <div className={classes.root}>
            <BioDialog/>
            <InfinitePhotoGrid fetchItems={12} columns={config.photoGridCols} spacing={config.photoGridSpacing} order="drive"/>
        </div>
    );

}

