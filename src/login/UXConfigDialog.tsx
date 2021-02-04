import React, {useEffect, useState} from 'react';
import {
    Button, FormControlLabel, Grid,
    MenuItem, Switch,
    TextField
} from "@material-ui/core";
import PhotosApi, {UXConfig} from "../common/api";


const gridSpacings = [
    {
        value: 0,
        label: 'None'
    },
    {
        value: 5,
        label: 'Thin'
    },
    {
        value: 10,
        label: 'Normal'
    },
    {
        value: 15,
        label: 'Thick'
    }
]
const UXConfigDialog: React.FC  = () => {

    const [cols, setCols] = useState<number>(4)
    const [loadItems, setLoadItems] = useState<number>(12)
    const [gridSpacing, setGridSpacing] = useState<number> (0)
    const [showBio, setShowBio] = useState<boolean>(true)
    const [conf, setConf] = useState<UXConfig> (PhotosApi.defaultUxConfig)

    useEffect(() => {
        const fetchUXConfig = async () => {
            try {
                const res: UXConfig = await PhotosApi.getUXConfig()
                setConf(res)
            } catch(e) {
                alert(e)
            }
        }
        fetchUXConfig()
    }, [])

    useEffect(() => {
        setCols(conf.photoGridCols)
        setLoadItems(conf.photoItemsLoad)
        setGridSpacing(conf.photoGridSpacing)
        setShowBio(conf.showBio)
    }, [conf])


    const handleUpdate = () => {
        const updateConfig = async () => {
            try {
                const conf: UXConfig = {
                    photoGridCols: cols,
                    photoGridSpacing: gridSpacing,
                    photoItemsLoad: loadItems,
                    showBio: showBio
                }
                const res = await PhotosApi.updateUXConfig(conf)
                setConf(res)
            }
            catch(e) {
                alert(e)
            }
        }
        updateConfig()
    }

    const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCols(Number(event.target.value))
    };

    const handleLoadItemsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoadItems(Number(event.target.value));
    };

    const handleGridSpacing = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridSpacing(Number(event.target.value));
    }
    const handleShowBio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowBio(event.target.checked)
    }

    return(
        <>
                <TextField size="medium" margin="normal" variant="outlined" id="cols" label="Grid Columns" value={cols}
                           onChange={handleColsChange} fullWidth type="number"/>
                <TextField select size="medium" margin="normal" type="number" variant="outlined" id="gridSpacing" label="Grid Spacing" value={gridSpacing}
                           onChange={handleGridSpacing} fullWidth>
                    {gridSpacings.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField size="medium" margin="normal" variant="outlined" id="loadItems" label="Load Items" value={loadItems}
                           onChange={handleLoadItemsChange} fullWidth type="number"/>
            <FormControlLabel label="Show Bio"
                control={
                    <Switch checked={showBio} onChange={handleShowBio} name="showBioS" color="primary"/>
                }
            />
            <Grid container justify="flex-end">
                <Button onClick={handleUpdate} variant="outlined">Save Config</Button>
            </Grid>
        </>
    );
};

export default UXConfigDialog
