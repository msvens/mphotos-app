import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import GridListTile from "@material-ui/core/GridListTile";
import {Link} from "react-router-dom";
import PhotosApi, {PhotoType} from "../services/api";
import GridList from "@material-ui/core/GridList";
import {Photo} from "../types/photo";
import InfiniteScroll from "react-infinite-scroll-component";
import {Typography} from "@material-ui/core";


interface InfinitePhotoGridProps {
    fetchItems: number,
    columns: number,
    spacing: "thin" | "normal" | "thick",
    order: "original" | "drive"
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
            maxWidth: 1020,
            margin: 'auto',
            // overflowY: 'scroll'

        },
        loader: {
            margin: 'auto'
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
    }),
);

const InfinitePhotoGrid: React.FC<InfinitePhotoGridProps> = (props: InfinitePhotoGridProps) => {
    const classes = useStyles();

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [offset, setOffset] = useState<number> (0);
    const [hasMore, setHasMore] = useState<boolean> (true);

    useEffect(() => {
        PhotosApi.getPhotos(props.fetchItems, 0).then(res => {
            if(res.length < props.fetchItems)
                setHasMore(false);
            if(res.length > 0) {
                setPhotos(res.photos)
                setOffset(res.length)
            }
        });
    }, [props.fetchItems]);
    /*useEffect(() => {
        PhotosApi.getPhotos(props.maxItems).then(res => {
            if (res.photos)
                setPhotos(res.photos)
        }).catch(e => alert(e.toString()));
    }, [props.maxItems]);*/

    const getSpacing = (): number => {
        if(props.spacing === "normal") {
            return 15;
        } else if(props.spacing === "thin") {
            return 10;
        } else {
            return 20;
        }
    }

    const fetchMoreData = () => {
        PhotosApi.getPhotos(props.fetchItems, offset).then(res => {
            if(res.length < props.fetchItems)
                setHasMore(false);
            if(res.length > 0) {
                setPhotos(photos.concat(res.photos))
                setOffset(offset + res.length)
            }
        });
    }

    const LoadMessage: React.FC = () => {
        return (
            <div className={classes.loader}>
                <Typography variant="h5">Loading more photos...</Typography>
            </div>
        );
    };

    return (
        <div className={classes.root}>
        <InfiniteScroll
            dataLength={photos.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
                <div/>
            }
            className={classes.grid}
        >
        <GridList cols={props.columns} cellHeight={'auto'} spacing={getSpacing()}>
            {photos.map(photo => (
                <GridListTile className={classes.thumb} cols={1} key={photo.driveId}>
                    <Link to={`/photo/${photo.driveId}`}>
                        {photo.private
                            ? <LazyLoadImage alt={photo.fileName} className={classes.thumbPrivate}
                                             src={PhotosApi.getImageUrl(photo, PhotoType.Thumb)}/>
                            : <LazyLoadImage alt={photo.fileName} className={classes.thumb}
                                             src={PhotosApi.getImageUrl(photo, PhotoType.Thumb)}/>
                        }

                    </Link>
                </GridListTile>
            ))}
        </GridList>
        </InfiniteScroll>
    </div>
    );
};

export default InfinitePhotoGrid;