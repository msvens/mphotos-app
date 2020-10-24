import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, MenuItem,
    TextField
} from "@material-ui/core";
import PhotosApi, {Photo} from "../services/api";


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


    const handleUpdate = () => {
        const conf = {photoGridCols: cols, photoGridSpacing: gridSpacing, photoItemsLoad: loadItems}
        PhotosApi.updateUXConfig(conf)
            .then(c => alert(JSON.stringify(c)))
            .catch(err => alert(err.toString()))

    }

    const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCols(Number(event.target.value))
    };

    const handleLoadItemsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoadItems(Number(event.target.value));
    };

    const handleGridSpacing = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridSpacing(Number(event.target.value));
    };

    return(
        <React.Fragment>
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
            <Button onClick={handleUpdate} variant="outlined">Save UX Confix</Button>
        </React.Fragment>
    );
};

export default UXConfigDialog
