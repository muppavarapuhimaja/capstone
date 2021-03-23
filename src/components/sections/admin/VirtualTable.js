import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import {AutoSizer, Column, Table} from 'react-virtualized';
import {Button, Grid} from "@material-ui/core";
import {
    DELETE_BUTTON_COLOR,
    DOWNLOAD_ACTION_TYPE,
    EDIT_ACTION_TYPE,
    UPDATE_BUTTON_COLOR
} from "../../../constants/constants";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from '@material-ui/icons/Remove';
import {ResponsePdfDownloadButton} from "./button/ResponsePdfDownloadButton";

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer',
        height: 50,
        borderBottom: "1px solid rgba(224, 224, 224, 1)"
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    tableCellRoot: {
      borderBottom: "none",
        height: "fit-content"
    },
    noClick: {
        cursor: 'initial',
    },
});

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    renderEditActionButtons = (id) => {
        return (
            <Grid container spacing={2} justify={"center"}>
                <Grid item xs={6}>
                    <Button variant="contained"
                            fullWidth
                            onClick={() => this.props.updateHandler(id)}
                            startIcon={<EditIcon/>}
                            style={{backgroundColor: UPDATE_BUTTON_COLOR, color: 'black'}}>
                        Update
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained"
                            fullWidth
                            startIcon={<RemoveIcon/>}
                            onClick={() => this.props.deleteHandler(id)}
                            style={{backgroundColor: DELETE_BUTTON_COLOR, color: 'white'}}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        )
    }

    renderDownloadActionButton = (userId) => {
        return (
            <Grid container justify={"center"}>
                <Grid item xs={12}>
                    <ResponsePdfDownloadButton userId={userId}/>
                </Grid>
            </Grid>
        )
    }


    getCellData = (columnIndex, cellData) => {
        if (columnIndex === this.props.actionColumnIndex) {
            switch (this.props.actionType) {
                case EDIT_ACTION_TYPE:
                    return this.renderEditActionButtons(cellData)
                case DOWNLOAD_ACTION_TYPE:
                    return this.renderDownloadActionButton(cellData)
                default:
                    console.error("Unsupported action type")
            }
        }
        return cellData
    }

    getRowClassName = ({index}) => {
        const {classes, onRowClick} = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({cellData, columnIndex}) => {
        const {columns, classes, onRowClick} = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                classes={{root: classes.tableCellRoot}}
                variant="body"
                style={{justifyContent: [0, 7].includes(columnIndex) ? 'center' : ''}}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {this.getCellData(columnIndex, cellData)}
            </TableCell>
        );
    };

    headerRenderer = ({label, columnIndex}) => {
        const {headerHeight, columns, classes} = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{
                    height: headerHeight,
                    justifyContent: ['Action', 'totalScore', 'Id'].includes(label) ? 'center' : '',
                    fontWeight: 700, color: 'white',
                    backgroundColor: 'black'
                }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const {classes, columns, rowHeight, headerHeight, ...tableProps} = this.props;
        return (
            <AutoSizer>
                {({height, width}) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({dataKey, ...other}, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export default function VirtualTable({
                                         data, attributes, rowHeight, actionType,
                                         deleteHandler, updateHandler, actionColumnIndex
                                     }) {

    if (data === null) {
        console.log('Returning from here virtual table')
        return null
    }

    console.log('Rendering virtual table')

    return (
        <Paper style={{minHeight: '76vh', width: '100%'}}>
            <VirtualizedTable
                rowCount={data.length}
                rowGetter={({index}) => data[index]}
                rowHeight={rowHeight}
                columns={attributes}
                actionType={actionType}
                deleteHandler={deleteHandler}
                updateHandler={updateHandler}
                actionColumnIndex={actionColumnIndex}
            />
        </Paper>
    );
}
