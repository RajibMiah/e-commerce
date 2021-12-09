import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormGroup-root': {
            flexDirection:'initial'
        }
    }
}))

export default function SimplePopover({today , setToday}) {
    const classes = useStyles();
    const [value, setValue] = React.useState('today');

    const handleChange = (event) => {
        setToday(!today)
        setValue(event.target.value);

    };


    return (

        <FormControl color = {'primary'} component="fieldset" className = {classes.root}>
            <RadioGroup aria-label="schedule" name="schedule" value={value} onChange={handleChange}>
                <FormControlLabel value="today" control={<Radio/>} label="Today"/>
                <FormControlLabel value="tomorrow" control={<Radio/>} label="Tomorrow"/>
            </RadioGroup>
        </FormControl>
    );
}