import React, {useContext, useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import GridListTile from "@material-ui/core/GridListTile";
import {Link} from "react-router-dom";
import PhotosApi, {Album} from "../common/api";
import GridList from "@material-ui/core/GridList";
import InfoIcon from '@material-ui/icons/Info'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import {Box, Button, GridListTileBar, IconButton} from "@material-ui/core";
import EditAlbumDialog from "./EditAlbumDialog";
import AddAlbumDialog from "./AddAlbumDialog";
import {AuthContext} from "../MPhotosApp";
import MPDialog from "../common/MPDialog";

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
        addAlbum: {
            width: 1020,
            maxWidth: 1020,
            margin: 'auto',
            paddingBottom: theme.spacing(1),


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
    const [showUpdate, setShowUpdate] = useState(false);
    const [showAdd, setShowAdd] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const context = useContext(AuthContext)

    useEffect(() => {
        PhotosApi.getAlbums().then(res => setAlbums(res)).catch(e => alert(e.toString()))
    }, []);

    const getSpacing = (): number => {
        if (spacing === "normal") {
            return 15;
        } else if (spacing === "thin") {
            return 10;
        } else {
            return 20;
        }
    }

    const getAlbumCover = (album: Album): string => {
        if (album.coverPic === "") {
            return "/album.png"
        } else {
            return PhotosApi.getThumbUrlId(album.coverPic)
        }
    }

    const handleCloseUpdate = (a?: Album) => {
        if(a) {
            const newAlbums = albums.map((aa) => {
                    if(aa.id === a.id)
                        return a
                    else
                        return aa
                })
            setAlbums(newAlbums)
        }
        setShowUpdate(false)
    }

    const handleCloseAdd = (a?: Album) => {
        if(a) {
            const newAlbums = [...albums]
            newAlbums.push(a)
            setAlbums(newAlbums)
            setIdx(0)
        }
        setShowAdd(false)
    }

    const deleteAlbum = () => {
        const del = async () => {
            try {
                const id = albums[idx].id
                await PhotosApi.deleteAlbum(id)
                const newAlbums = albums.filter((a) => a.id !== id)
                setIdx(0)
                setAlbums(newAlbums)
            } catch (e) {
                alert(e)
            }
        }
        del()
    }

    const AlbumInfo: React.FC<AlbumInfoProps> = ({album, index}) => {
        if (context.isUser) {
            return (
                <GridListTileBar className={classes.thumbBar}
                                 title={album.name}
                                 actionIcon={
                                     <>
                                         <IconButton aria-label={`edit ${album.name}`} className={classes.icon}
                                                     onClick={() => {
                                                         setIdx(index);
                                                         setShowUpdate(true)
                                                     }}>
                                             <EditIcon/>
                                         </IconButton>
                                         <IconButton aria-label={`delete ${album.name}`} className={classes.icon}
                                                     onClick={() => {
                                                         setIdx(index);
                                                         setShowDelete(true)
                                                     }}>
                                             <DeleteForeverIcon/>
                                         </IconButton>
                                     </>
                                 }
                />
            );
        } else if (album.description === "") {
            return (<GridListTileBar className={classes.thumbBar} title={album.name}/>);
        } else {
            return (
                <GridListTileBar className={classes.thumbBar}
                                 title={album.name}
                                 actionIcon={
                                     <IconButton aria-label={`info about ${album.name}`} className={classes.icon}>
                                         <InfoIcon/>
                                     </IconButton>
                                 }
                />
            );
        }
    }

    return (
        <div className={classes.root}>
            {context.isUser &&
            <>
                <MPDialog open={showDelete} onClose={() => setShowDelete(false)}
                          onOk={deleteAlbum} title={"Delete Album"}
                          text="Deleting an album will not remove the associated images"/>

                <AddAlbumDialog open={showAdd} onClose={handleCloseAdd}/>
            </>
            }
            {context.isUser &&
            <Box className={classes.addAlbum} display="flex" flexGrow={1}>
                <Button variant="outlined"
                        startIcon={<AddPhotoAlternateOutlinedIcon/>}
                        onClick={() => {
                            setShowAdd(true)
                        }}>
                    Add New Album
                </Button>
            </Box>
            }
            <GridList cols={columns} cellHeight={'auto'} spacing={getSpacing()} className={classes.grid}>
                {albums.map((album, index) => (
                    <GridListTile className={classes.thumb} cols={1} key={album.name}>
                        <Link to={`/albums/${album.id}`}>
                            <LazyLoadImage alt={album.name} className={classes.thumb} src={getAlbumCover(album)}/>
                        </Link>
                        <AlbumInfo album={album} index={index}/>
                    </GridListTile>
                ))}
            </GridList>
            {albums.length > 0 &&
            <EditAlbumDialog open={showUpdate} album={albums[idx]} onClose={handleCloseUpdate}/>
            }
        </div>
    );
};

export default AlbumGrid;