import React from "react"
import {colorScheme, ColorScheme, parseSearchParams} from "../common/api";
import {Button, createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import {Link} from "react-router-dom";

type PhotoFilterProps = {
    filter: string
    onClear: () => void
    colorScheme: ColorScheme
}

const useStyles = makeStyles<Theme, ColorScheme>((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            margin: 'auto',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(1),
            backgroundColor: (props: ColorScheme) => props.backgroundColor,
            color: (props: ColorScheme) => props.color
        },
    })
)

const PhotoFilter: React.FC<PhotoFilterProps> = (props) => {
    const classes = useStyles(props.colorScheme)
    const f = parseSearchParams(props.filter)
    return (
        <div className={classes.root}>
            <Grid container spacing={6} justify="center" alignItems="center">
                <Grid item>
                    {f.cameraModel &&
                    "Camera Model: " + f.cameraModel
                    }
                </Grid>
                <Grid>
                    <Button variant="outlined" size="small" color="inherit" onClick={props.onClear}>
                        Clear Filter
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default PhotoFilter