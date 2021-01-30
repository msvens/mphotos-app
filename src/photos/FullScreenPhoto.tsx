import React from 'react';
import {createStyles, Dialog, fade, makeStyles, Theme} from "@material-ui/core";
import PhotosApi, {PhotoType, Photo} from "../common/api";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.black,
        },
        imgItem: {
            display: 'flex',
            margin: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.black,
            maxHeight: '100%',
            height: '100%',
        },
        img: {
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            //width: 'auto'
            width: 'auto',
            height: 'auto',
        },
        navButtons: {
            position: 'absolute',
            top: theme.spacing(2),
            right: theme.spacing(2),
        },
        editButton: {
            color: '#FFFFFF',
            backgroundColor: fade(theme.palette.grey.A700, 0.3).toString(),
            marginRight: theme.spacing(1),
            '&:hover': {
                backgroundColor: fade(theme.palette.grey.A700, 0.6).toString(),
            },
        },
    }),
);

interface FullScreenPhotoProps {
    photo: Photo,
    openDialog: boolean,
    onClose: () => void,
    onPrev: () => void,
    onNext: () => void,
}

interface TouchState {
    xStart: number,
    xPos: number,
    yStart: number,
    yPos: number
}


const FullScreenPhoto: React.FC<FullScreenPhotoProps> = ({photo, openDialog, onClose, onPrev, onNext}) => {

    const classes = useStyles();

    //const [touch, setTouch] = useState<TouchState>({xStart: -1, xPos: -1, yStart: -1, yPos: -1})
    const touch: TouchState = {xStart: -1, xPos: -1, yStart: -1, yPos: -1}


    const onStartTouch = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!openDialog || (event.touches && event.touches.length > 1)) return

        touch.xStart = event.touches[0].clientX
        touch.yStart = event.touches[0].clientY
        touch.xPos = touch.xStart
        touch.yPos = touch.yStart

    }

    const onMoveTouch = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!openDialog || (event.touches && event.touches.length > 1)) return
        touch.xPos = event.touches[0].clientX;
        touch.yPos = event.touches[0].clientY;

    };

    const onEndTouch = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!openDialog || (event.touches && event.touches.length > 1)) return

        const deltaX = touch.xStart - touch.xPos
        const deltaY = touch.yStart - touch.yPos
        touch.xStart = touch.yStart = touch.xPos = touch.yPos = -1

        if(Math.abs(deltaX) > 30 && Math.abs(deltaY) < 40)
            deltaX < 0 ? onPrev() : onNext();
    };

    return (
        <React.Fragment>
            <Dialog PaperProps={{ classes: {root: classes.root} }} fullScreen open={openDialog} onClose={onClose}>
                <div className={classes.imgItem} onTouchEnd={onEndTouch} onTouchStart={onStartTouch} onTouchMove={onMoveTouch}>
                    <img alt={photo.title} className={classes.img} src={PhotosApi.getImageUrl(photo, PhotoType.Original)}/>
                    <div className={classes.navButtons}>
                        <IconButton aria-label="previous" className={classes.editButton} onClick={onPrev}>
                            <ArrowBackIosSharpIcon fontSize="small"/>
                        </IconButton>
                        <IconButton aria-label="next" color="primary" onClick={onNext}
                                    className={classes.editButton}>
                            <ArrowForwardIosSharpIcon fontSize="small"/>
                        </IconButton>
                        <IconButton aria-label="fullScreen" color="primary" onClick={onClose}
                                    className={classes.editButton}>
                            <FullscreenExitIcon fontSize="small"/>
                        </IconButton>
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    );
};

export default FullScreenPhoto;