import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GridListTile from "@material-ui/core/GridListTile";
import {Link} from "react-router-dom";
import PhotosApi, {Album} from "../services/api";
import GridList from "@material-ui/core/GridList";
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import {GridListTileBar, IconButton} from "@material-ui/core";
import EditAlbumDialog from "./EditAlbumDialog";

interface AlbumGridProps {
    columns: number,
    spacing: "thin" | "normal" | "thick",
}

interface AlbumInfoProps {
    album: Album,
    index: number
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

        grid: {
            width: 1020,
            maxWidth: 1020,
            margin: 'auto',

        },
        thumb: {
            width: '100%',
            height: 'auto'
        },
        thumbPrivate: {
            width: '100%',
            height: 'auto',
            opacity: 0.5,
        },
        thumbBar: {
            width: '100%',
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.8)',
        },
    }),
);

const AlbumGrid: React.FC<AlbumGridProps> = ({columns, spacing}) => {
    const classes = useStyles();

    const [idx, setIdx] = useState<number>(0);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        PhotosApi.getAlbums().then(res => setAlbums(res)).catch(e => alert(e.toString()))
    }, []);

    useEffect(() => {
        PhotosApi.isLoggedIn().then(res => setLoggedIn(res))
    }, []);

    const getSpacing = (): number => {
        if(spacing === "normal") {
            return 15;
        } else if(spacing === "thin") {
            return 10;
        } else {
            return 20;
        }
    }

    const getAlbumCover = (album: Album): string => {
        if(album.coverPic === "") {
            return "/album.png"
        }  else {
            return PhotosApi.getThumbUrlId(album.coverPic)
        }
    }

    const handleCloseUpdate = () => {
        setShowUpdate(false)
    }

    const updateAlbum = (name: string, description: string) => {
        alert(name+" "+description)
    }

    const deleteAlbum = (album: Album) => {
        alert("delete "+album.name)
    }

    const AlbumInfo: React.FC<AlbumInfoProps> = ({album, index}) => {
        if(loggedIn) {
            return (
                <GridListTileBar className={classes.thumbBar}
                    title={album.name}
                    actionIcon={
                        <IconButton aria-label={`info about ${album.name}`} className={classes.icon}
                                    onClick={() => {setIdx(index); setShowUpdate(true)}}>
                            <EditIcon/>
                        </IconButton>
                    }
                />
            );
        } else if(album.description == "") {
            return (<GridListTileBar  className={classes.thumbBar} title={album.name}/>);
        } else {
            return (
                <GridListTileBar className={classes.thumbBar}
                    title={album.name}
                    actionIcon={
                        <IconButton aria-label={`info about ${album.name}`} className={classes.icon}>
                            <InfoIcon />
                        </IconButton>
                    }
                />
            );
        }
    }

    return (
        <div className={classes.root}>
        <GridList cols={columns} cellHeight={'auto'} spacing={getSpacing()} className={classes.grid}>
            {albums.map((album,index) => (
                <GridListTile className={classes.thumb} cols={1} key={album.name}>
                    <Link to={`/albums/${album.name}`}>
                        <LazyLoadImage alt={album.name} className={classes.thumb} src={getAlbumCover(album)}/>
                    </Link>
                    <AlbumInfo album={album} index={index}/>
                </GridListTile>
            ))}
        </GridList>
            {albums.length > 0 &&
            <EditAlbumDialog open={showUpdate} album={albums[idx]} onDelete={deleteAlbum} onClose={handleCloseUpdate} onSubmit={updateAlbum}/>
            }
        </div>
    );
};

export default AlbumGrid;