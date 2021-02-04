import React from 'react';
import {createStyles, fade, makeStyles, Theme, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import FaceIcon from "@material-ui/icons/Face";

type PhotoControlsProps = {
    isPrivate: boolean,
    onBackward: () => void
    onForward: () => void
    onFullScreen: () => void
    onPrivate: () => void
    onDelete: () => void
    onEdit: () => void
    onProfilePic: () => void
    isAlbum: boolean
    showEditControls: boolean
    isLargeDisplay: boolean
}

type EditButtonProps = {
    tooltip: string,
    onClick: () => void,
}

const useStyles = makeStyles((theme: Theme) => {

        const editB = {
            color: '#FFFFFF',
            backgroundColor: fade(theme.palette.common.black, 0.7).toString(),
            marginRight: theme.spacing(1),
            '&:hover':
                {
                    backgroundColor: fade(theme.palette.common.black, 0.9).toString(),
                }
        }
        return createStyles({
            //navigation:
            topRight: {
                ...editB,
                position: 'absolute',
                top: theme.spacing(2),
                right: theme.spacing(1),
            },
            middleLeft: {
                ...editB,
                position: 'absolute',
                //top: theme.spacing(2),
                top: '50%',
                transform: 'translateY(-50%)',
                left: theme.spacing(2),
                //left: 2
            },
            middleRight: {
                ...editB,
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                //right: theme.spacing(2),
                right: theme.spacing(1),
            },
            editButtons: {
                position: 'absolute',
                top: theme.spacing(2),
                left: theme.spacing(2),
            },
            editButton: {
                color: '#FFFFFF',
                backgroundColor: fade(theme.palette.common.black, 0.7).toString(),
                marginRight: theme.spacing(1),
                '&:hover': {
                    backgroundColor: fade(theme.palette.common.black, 0.9).toString(),
                },
            },

        })
    }
)


const PhotoControls: React.FC<PhotoControlsProps> = (props) => {
    const classes = useStyles()

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

    return (
        <>
            <IconButton aria-label="previous" onClick={props.onBackward}
                        className={classes.middleLeft}>
                <ArrowBackIosSharpIcon fontSize={props.isLargeDisplay ? "large" : "small"}/>
            </IconButton>
            <IconButton aria-label="next" color="primary" onClick={props.onForward}
                        className={classes.middleRight}>
                <ArrowForwardIosSharpIcon fontSize={props.isLargeDisplay ? "large" : "small"}/>
            </IconButton>
            <IconButton aria-label="fullScreen" color="primary" onClick={props.onFullScreen}
                        className={classes.topRight}>
                <FullscreenIcon fontSize={props.isLargeDisplay ? "large" : "small"}/>
            </IconButton>
            {props.showEditControls &&
            <div className={classes.editButtons}>
                {props.isAlbum
                    ? <EditButton tooltip="Set Album Cover" onClick={props.onProfilePic}>
                        <PhotoAlbumIcon fontSize="small"/>
                    </EditButton>
                    : <EditButton tooltip="Set Profile Picture" onClick={props.onProfilePic}>
                        <FaceIcon fontSize="small"/>
                    </EditButton>
                }
                {props.isPrivate
                    ? <EditButton tooltip="Set Public Photo" onClick={props.onPrivate}>
                        <LockIcon fontSize="small"/>
                    </EditButton>
                    : <EditButton tooltip="Set Private Photo" onClick={props.onPrivate}>
                        <LockOpenIcon fontSize="small"/>
                    </EditButton>
                }
                <EditButton tooltip="Edit Photo Description" onClick={props.onEdit}>
                    <EditIcon fontSize="small"/>
                </EditButton>
                <EditButton tooltip="Delete Photo" onClick={props.onDelete}>
                    <DeleteForeverIcon fontSize="small"/>
                </EditButton>
            </div>
            }
        </>
    )
}

export default PhotoControls