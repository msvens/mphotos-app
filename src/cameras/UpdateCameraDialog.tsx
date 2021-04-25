import React, {useState} from 'react';
import PhotosApi, {Camera, getCameraSettingDisplayName, setCameraSetting} from "../common/api";
import {Input, Table, TableBody, TableCell, TableRow, TextField} from "@material-ui/core";
import MPDialog from "../common/MPDialog";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

type UpdateCameraDialogProps = {
    onClose: (c?: Camera) => void
    open: boolean
    camera: Camera
}

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
            paddingBottom: theme.spacing(4)
        },
        image: {
            width: 400,
            maxWidth: 400,
        },
        adminButton: {
            textTransform: 'none',
            radius: 3
        },
        break: {
            flexBasis: '100%',
            height: 0.
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


const UpdateCameraDialog: React.FC<UpdateCameraDialogProps> = ({open, onClose, camera}) => {

    const classes = useStyles()

    const [c, setC] = useState<Camera>(camera)

    const handleOnClose = () => {
        onClose(undefined)
    }

    const handleOk = () => {
        const update = async () => {
            try {
                const res = await PhotosApi.updateCamera(c)
                onClose(res)
            } catch (e) {
                alert(e)
            }

        }
        update()
    }

    const handleCameraChange = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const newC = setCameraSetting(c, key, event.target.value)
        setC(newC)
    }


    function row(key: string) {
        const disp = getCameraSettingDisplayName(key, c)
        return (
            <TableRow>
                <TableCell component="th" scope="row">{disp.displayName}</TableCell>
                <TableCell>{disp.displayValue}</TableCell>
            </TableRow>

        )
    }

    function editRow(key: string) {
        const disp = getCameraSettingDisplayName(key, c)
        return (
            <TableRow>
                <TableCell component="th" scope="row">{disp.displayName}</TableCell>
                <TableCell>
                    <Input value={disp.rawValue} margin={'dense'} color={"secondary"} fullWidth
                           className={classes.input}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCameraChange(key, e)}/>
                </TableCell>
            </TableRow>
        )
    }


    return (
        <MPDialog open={open} onClose={handleOnClose} onOk={handleOk} title={"Update Camera"}
                  text={"Update Camera Spec"} closeOnOk={false}>
            <Table aria-label="Camera Specs" size={"small"} className={classes.table}>
                <TableBody>
                    {Object.getOwnPropertyNames(c).map((v, i) => {
                        if (v === "make" || v === "model")
                            return row(v)
                        else if (v !== "id" && v !== "image")
                            return editRow(v)
                    })}
                </TableBody>
            </Table>
        </MPDialog>
    )
}

export default UpdateCameraDialog

