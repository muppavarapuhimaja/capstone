import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: "95%",
        height: 35
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Dropdown({data, label, defaultValue, fetchDataHandler, required, ddlMaxWidth}) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        defaultValue = ''
        setValue(event.target.value)
        fetchDataHandler(event.target.value)
    };

    const renderMenuItems = () => {
        let optionList = []
        for (let [k, v] of data) {
            optionList.push(
                <MenuItem key={v} value={k}>{v}</MenuItem>
            )
        }
        return optionList
    }

    // data.forEach(function(value, key) {
    //     console.log(key + ' = ' + value)
    // })
    // console.log(`Default Value = ${defaultValue}, value = ${value}, data= ${data.has(parseInt(value))}`)

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel style={{lineHeight: 0}} id="demo-simple-select-outlined-label">{label}</InputLabel>
            <Select
                id={label}
                value={value === '' && defaultValue !== '' ? `${defaultValue}`: data.has(parseInt(value))? value: `${defaultValue}`}
                onChange={handleChange}
                required={required}
                rowsMax={3}
                label={label}
                style={{height: 35, width: "100%", maxWidth: ddlMaxWidth}}
            >
                {renderMenuItems()}
            </Select>
        </FormControl>
    );
}
