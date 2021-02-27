import React from 'react';
import {createStyles, fade, makeStyles, Theme, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import FaceIcon from "@material-ui/icons/Face";
import {ColorScheme, colorScheme} from "../common/api";

type PhotoControlsProps = {
    photoBackground: string
    isLargeDisplay: boolean
    showEditControls: boolean
    inFullscreen: boolean
    hasBorders: boolean
    onBackward: () => void
    onForward: () => void
    onFullScreen: () => void
    isPrivate?: boolean,
    verticalEditButtons?: boolean,
    onPrivate?: () => void
    onDelete?: () => void
    onEdit?: () => void
    onProfilePic?: () => void
    isAlbum?: boolean
}

type EditButtonProps = {
    tooltip: string,
    onClick: () => void,
}

type StyleProps = {
    backgroundColor: string,
    color: string,
    borders: boolean,
    verticalEditButtons: boolean
}

const useStyles = makeStyles<Theme,StyleProps>((theme: Theme) => {


        const editB = {
            color: (props: StyleProps) => props.color,
            backgroundColor: (props: StyleProps) => fade(props.backgroundColor, props.borders ? 0.0 : 0.5).toString(),
            marginRight: theme.spacing(1),
            '&:hover':
                {
                    backgroundColor: (props: ColorScheme) => fade(props.backgroundColor, 0.9).toString(),
                }
        }
        return createStyles({
            //navigation:
            topRight: {
                ...editB,
                position: 'absolute',
                top: theme.spacing(0),
                right: theme.spacing(-1),
            },
            middleLeft: {
                ...editB,
                position: 'absolute',
                //top: theme.spacing(2),
                top: '50%',
                transform: 'translateY(-50%)',
                left: theme.spacing(0),
                //left: 2
            },
            middleRight: {
                ...editB,
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                //right: theme.spacing(2),
                right: theme.spacing(-1),
            },
            editButtons: {
                display: 'flex',
                flexDirection: (props: StyleProps) => props.verticalEditButtons ? 'column' : 'row',
                position: 'absolute',
                top: theme.spacing(0),
                left: theme.spacing(0),
            },
            editButton: {
                ...editB,
            },

        })
    }
)


const PhotoControls: React.FC<PhotoControlsProps> = (props) => {

    const cs = colorScheme(props.photoBackground)
    const p = {backgroundColor: cs.backgroundColor, color: cs.color, borders: props.hasBorders,
        verticalEditButtons: props.verticalEditButtons ? props.verticalEditButtons : false}
    const classes = useStyles(p)



    const EditButton: React.FC<EditButtonProps> = ({tooltip, onClick, children}) => {
        return (
            <Tooltip title={tooltip}>
                <IconButton aria-label={tooltip} onClick={onClick}
                            className={classes.editButton}>
                    {children}
                </IconButton>
            </Tooltip>

        )
    }

    const wrap = (f?: () => void):()=>void => {
        if(f)
            return f
        else
            return () => {alert("undefiend action")}
    }

    return (
        <>
            <IconButton aria-label="previous" onClick={props.onBackward}
                        className={classes.middleLeft}>
                <ArrowBackIosSharpIcon fontSize={props.isLargeDisplay ? "large" : "small"}/>
            </IconButton>
            <IconButton aria-label="next" color="primary" onClick={props.onForward}
                        className={classes.middleRight} edge={"end"}>
                <ArrowForwardIosSharpIcon fontSize={props.isLargeDisplay ? "large" : "small"}/>
            </IconButton>
            {props.inFullscreen
                ? <IconButton aria-label="exit fullscreen" color="primary" onClick={props.onFullScreen}
                              className={classes.topRight}>
                    <FullscreenExitIcon fontSize={props.isLargeDisplay ? "large" : "small"}/>
                </IconButton>
                : <IconButton aria-label="enter fullscreen" color="primary" onClick={props.onFullScreen}
                              className={classes.topRight}>
                    <FullscreenIcon fontSize={props.isLargeDisplay ? "large" : "small"}/>
                </IconButton>
            }
            {props.showEditControls &&
            <div className={classes.editButtons}>
                {props.isAlbum
                    ? <EditButton tooltip="Set Album Cover" onClick={wrap(props.onProfilePic)}>
                        <PhotoAlbumIcon fontSize={props.isLargeDisplay ? "large" : "small"}/>
                    </EditButton>
                    : <EditButton tooltip="Set Profile Picture" onClick={wrap(props.onProfilePic)}>
                        <FaceIcon fontSize="small"/>
                    </EditButton>
                }
                {props.isPrivate
                    ? <EditButton tooltip="Set Public Photo" onClick={wrap(props.onPrivate)}>
                        <LockIcon fontSize="small"/>
                    </EditButton>
                    : <EditButton tooltip="Set Private Photo" onClick={wrap(props.onPrivate)}>
                        <LockOpenIcon fontSize="small"/>
                    </EditButton>
                }
                <EditButton tooltip="Edit Photo Description" onClick={wrap(props.onEdit)}>
                    <EditIcon fontSize="small"/>
                </EditButton>
                <EditButton tooltip="Delete Photo" onClick={wrap(props.onDelete)}>
                    <DeleteForeverIcon fontSize="small"/>
                </EditButton>
            </div>
            }
        </>
    )
}

export default PhotoControls