import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import GridListTile from "@material-ui/core/GridListTile";
import {Link} from "react-router-dom";
import PhotosApi, {PhotoType, Photo} from "../common/api";
import GridList from "@material-ui/core/GridList";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfinitePhotoGridProps {
    fetchItems: number,
    columns: number,
    spacing: number,
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
        },
        loader: {
            margin: 'auto'
        },
        thumb: {
            width: '100%',
            height: '100%'
        },
        thumbPrivate: {
            width: '100%',
            height: '100%',
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

    const fetchMoreData = () => {
        PhotosApi.getPhotos(props.fetchItems, offset).then(res => {
            if(res.length < props.fetchItems)
                setHasMore(false);
            if(res.length > 0) {
                setPhotos(photos.concat(res.photos))
                setOffset(offset + res.length)
            }
        })
    }

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
        <GridList cols={props.columns} cellHeight={'auto'} spacing={props.spacing}>
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