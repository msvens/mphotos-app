import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    LinearProgressProps, Typography
} from "@material-ui/core"
import PhotosApi, {Job, JobState} from "../common/api";
import {useInterval} from "../common/hooks";

interface DownloadDrivePhotosDialogProps {
    open: boolean,
    onClose: () => void
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const DownloadDrivePhotosDialog: React.FC<DownloadDrivePhotosDialogProps> = ({open, onClose}) => {

    const [job, setJob] = useState<Job>()
    const delay = 500
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [numPhotos, setNumPhotos] = useState<number>(0)

    const checkJob = () => {
        const check = async () => {
            if (job) {
                const res = await PhotosApi.statusJob(job.id)
                switch (res.state) {
                    case JobState.FINISHED:
                        setIsRunning(false)
                        break
                    case JobState.ABORTED:
                        setIsRunning(false)
                        alert("Job Aborted " + job.error)
                        break
                }
                setJob(res)
            } else {
                setIsRunning(false)
                alert("no job defined")
            }
        }
        check()
    }

    useInterval(checkJob, isRunning ? delay : null)


    useEffect(() => {
        if (job === undefined) {
            PhotosApi.checkDrive().then(res => setNumPhotos(res.length)).catch(err => alert(err))
        }
    }, [job])


    const handleDownload = () => {
        const scheduleJob = async () => {
            const res = await PhotosApi.scheduleUpdatePhotos()
            if (res.state === JobState.STARTED || res.state === JobState.SCHEDULED) {
                setIsRunning(true)
                setJob(res)
            } else {
                alert(res.state)
            }
        }
        scheduleJob()
    }

    const Content: React.FC = () => {
        if (job) {
            return (
                <>
                    <DialogTitle id="dialog-title">Download Progress</DialogTitle>
                    <DialogContent>
                        <LinearProgressWithLabel value={job.percent} />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={isRunning} onClick={() => {
                            onClose()
                            setJob(undefined)
                        }} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </>
            )
        } else {
            return (
                <>
                    <DialogTitle id="dialog-title">Download Photos From Your Drive Folder</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="dialog-content">
                            There are current {numPhotos} photos to download from your drive folder
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button disabled={numPhotos === 0} onClick={handleDownload} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </>
            )
        }
    }

    return (
        <Dialog open={open} aria-labelledby="dialog-title" aria-describedby="dialog-content"
                fullWidth maxWidth='md'>
            <Content/>
        </Dialog>
    )
}

export default DownloadDrivePhotosDialog