import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        maxWidth: 430,
        maxHeight: 450
    },
});

function createData(response, guidance) {
    return {response, guidance};
}

const rows = [
    createData(0, "Don't have or don't perform this activity at all"),
    createData(1, "Starting to think about these activities, but no real plan in place yet"),
    createData(2, "Try to perform these activities when we can"),
    createData(3, "Have documented procedures in place, but could do better"),
    createData(4, "Feel comfortable that we are doing the best we can with available resources/budget"),
    createData(5, "We got this!!!"),
];

export default function BasicTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} style={{backgroundColor: "black", color: "blanchedalmond"}}>
            <Grid container justify={"center"} style={{
                color: "darkorange", fontSize: "1.2rem",
                fontWeight: 600, padding: 15
            }}>
                Scoring Guidance
            </Grid>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{color: "inherit"}}>Response</TableCell>
                        <TableCell align="left" style={{color: "inherit"}}>Guidance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.response}>
                            <TableCell component="th" scope="row" align="center" style={{color: "inherit"}}>
                                {row.response}
                            </TableCell>
                            <TableCell align="left" style={{color: "inherit"}}>{row.guidance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
