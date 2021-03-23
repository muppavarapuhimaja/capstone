import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker({name, daysToSubtract, fetchDateHandler}) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date(new Date().getTime()
        - (daysToSubtract * 24 * 60 * 60 * 1000)));

    const handleDateChange = (date) => {
        setSelectedDate(date);
        fetchDateHandler(date)
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id={name}
                    label={name}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
