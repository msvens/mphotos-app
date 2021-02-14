import React, {useEffect, useState} from 'react';
import {
    Button, FormControl, FormControlLabel, FormLabel, Grid,
    MenuItem, Radio, RadioGroup, Switch,
    TextField
} from "@material-ui/core";
import PhotosApi, {Colors, UXConfig} from "../common/api";


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
    const [photoBackground, setPhotoBackground] = useState<string>("")
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
        setPhotoBackground(conf.photoBackgroundColor)
    }, [conf])


    const handleUpdate = () => {
        const updateConfig = async () => {
            try {
                const conf: UXConfig = {
                    photoGridCols: cols,
                    photoGridSpacing: gridSpacing,
                    photoItemsLoad: loadItems,
                    showBio: showBio,
                    photoBackgroundColor: photoBackground
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

    const handlePhotoBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhotoBackground((event.target as HTMLInputElement).value);
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
            <br/>
            <br/>
            <FormControl component="fieldset">
                <FormLabel component="legend">Photo Background Color</FormLabel>
                <RadioGroup aria-label="Photo Background" name="photoBackground" value={photoBackground}
                            onChange={handlePhotoBackgroundChange}>
                    <FormControlLabel value={Colors.Black} control={<Radio />} label="Black" />
                    <FormControlLabel value={Colors.White} control={<Radio />} label="White" />
                    <FormControlLabel value={Colors.LightGrey} control={<Radio />} label="Light Grey" />
                    <FormControlLabel value={Colors.Grey} control={<Radio />} label="Grey" />
                    <FormControlLabel value={Colors.DarkGrey} control={<Radio />} label="Dark Grey" />
                </RadioGroup>
            </FormControl>

            <Grid container justify="flex-end">
                <Button onClick={handleUpdate} variant="outlined">Save Config</Button>
            </Grid>
        </>
    );
};

export default UXConfigDialog
