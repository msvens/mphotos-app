import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React from "react";
import PhotosApi, {
    Camera,
    CameraImageSize,
    createPhotoSearchParams,
    getCameraSettingDisplayName,
    toQueryString
} from "../common/api";
import {Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'wrap',
            paddingLeft: 0,
            margin: 'auto',
            maxWidth: 600,
        },
        table: {
            minWidth: 512,
            maxWidth: 600,
        },
        imageDiv: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(4),
            margin: 'auto'
        },
        image: {
            width: 'auto',
            height: 300,
            maxHeight: 300,
        },
        adminButton: {
            textTransform: 'none',
            radius: 3
        },
        centeredRow: {
            display: 'flex',
            flexBasis: '100%',
            justifyContent: 'center',
            alignItems: 'center'
            //height: 0,
        },
        edit: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            width: 400,
            paddingBottom: theme.spacing(2)
        },
        input: {
            padding: 0,
            border: "none",
            margin: 0,
            "&&&:before": {
                borderBottom: "none"
            },
            "&&:after": {
                borderBottom: "none"
            }
        }
    }),
)

type CameraDetailProps = {
    camera: Camera
    onUpdate: (c: Camera) => void
}

const CameraDetail: React.FC<CameraDetailProps> = ({camera, onUpdate, children}) => {
    const classes = useStyles()

    function row(key: string) {
        const disp = getCameraSettingDisplayName(key, camera)
        return (
            <TableRow>
                <TableCell component="th" scope="row">{disp.displayName}</TableCell>
                <TableCell>{disp.displayValue}</TableCell>
            </TableRow>

        )
    }

    const getQuery = () => {
        return toQueryString(createPhotoSearchParams(camera.model))
    }

    return (
        <div className={classes.root}>
            <div className={classes.centeredRow}>
                <Typography variant="subtitle1" gutterBottom>
                    <strong>{camera.model} (<Link color={"inherit"} component={RouterLink} to={`/photos?${getQuery()}`}>Photos</Link>)
                    </strong>
                </Typography>
            </div>
            <div className={classes.imageDiv}>
                <img className={classes.image} alt={camera.model}
                     src={PhotosApi.getCameraImageUrl(camera, CameraImageSize.Medium)}/>
            </div>
            <div className={classes.centeredRow}>
                {children}
            </div>

            <Table aria-label="Camera Specs" size={"small"} className={classes.table}>
                <TableBody>
                    {Object.getOwnPropertyNames(camera).map((v,i) => {
                        if(v !== "id" && v !== "image")
                            return row(v)
                    })}
                </TableBody>
            </Table>

        </div>

    )
}

export default CameraDetail
