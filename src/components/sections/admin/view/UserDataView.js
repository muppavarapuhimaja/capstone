import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {CSVLink} from 'react-csv'
import {SERVER_URL} from "../../../../config/config";
import DatePicker from "../DatePicker";
import {Button} from "@material-ui/core";
import {USERS_API} from "../../../../constants/api_routes";
import {InternalServerError} from "../../errors/InternalServerError";
import VirtualTable from "../VirtualTable";
import {Loading} from "../../../ui/common/Loading";
import {useSnackbar} from "notistack";
import {
    DOWNLOAD_ACTION_TYPE,
    DOWNLOAD_BUTTON_COLOR,
    SNACKBAR_AUTO_HIDE_DURATION
} from "../../../../constants/constants";
import GetAppIcon from '@material-ui/icons/GetApp';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import {DataNotFound} from "../../errors/DataNotFound";
import {useSelector} from "react-redux";

const userAPIDataAttributes = {
    userId: ['userId', 'Id'],
    firstName: ['firstName', 'First Name'],
    lastName: ['lastName', 'Last Name'],
    email: ['email', 'Email'],
    phone: ['phone', 'Phone'],
    companyName: ['companyName', 'Company'],
    lastActiveDate: ['lastActiveDate', 'Date'],
    totalScore: ['totalScore', 'Total Score'],
}

const userAttributes = [
    {
        width: 80,
        label: userAPIDataAttributes.userId[1],
        dataKey: userAPIDataAttributes.userId[0],
        numeric: true
    },
    {
        width: 140,
        label: userAPIDataAttributes.firstName[1],
        dataKey: userAPIDataAttributes.firstName[0],
    },
    {
        width: 140,
        label: userAPIDataAttributes.lastName[1],
        dataKey: userAPIDataAttributes.lastName[0],
    },
    {
        width: 320,
        label: userAPIDataAttributes.email[1],
        dataKey: userAPIDataAttributes.email[0],
    },
    {
        width: 150,
        label: userAPIDataAttributes.phone[1],
        dataKey: userAPIDataAttributes.phone[0],
    },
    {
        width: 220,
        label: userAPIDataAttributes.companyName[1],
        dataKey: userAPIDataAttributes.companyName[0],
    },
    {
        width: 120,
        label: userAPIDataAttributes.lastActiveDate[1],
        dataKey: userAPIDataAttributes.lastActiveDate[0],
    },
    {
        width: 120,
        label: userAPIDataAttributes.totalScore[1],
        dataKey: userAPIDataAttributes.totalScore[0],
        numeric: true
    },
    {
        width: 160,
        label: 'Action',
        dataKey: 'userId',
        numeric: true
    }
]

let csvHeaders = [
    {label: userAPIDataAttributes.userId[1], key: userAPIDataAttributes.userId[0]},
    {label: userAPIDataAttributes.firstName[1], key: userAPIDataAttributes.firstName[0]},
    {label: userAPIDataAttributes.lastName[1], key: userAPIDataAttributes.lastName[0]},
    {label: userAPIDataAttributes.email[1], key: userAPIDataAttributes.email[0]},
    {label: userAPIDataAttributes.phone[1], key: userAPIDataAttributes.phone[0]},
    {label: userAPIDataAttributes.companyName[1], key: userAPIDataAttributes.companyName[0]},
    {label: userAPIDataAttributes.lastActiveDate[1], key: userAPIDataAttributes.lastActiveDate[0]},
    {label: userAPIDataAttributes.totalScore[1], key: userAPIDataAttributes.totalScore[0]},
];

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    button: {
        paddingBottom: 15
    },
    exportButton: {
        color: '#FFFFFF',
        textDecoration: 'none'
    }
}));

export function UserDataView() {
    const classes = useStyles();
    const noOfPastDays = 7
    const [state, setState] = useState({
        data: null,
        loading: false,
        httpCode: 200,
        startDate: new Date(new Date().getTime() - (noOfPastDays * 24 * 60 * 60 * 1000)),
        endDate: new Date(),
        csvHeadersLoaded: false
    })
    const {enqueueSnackbar} = useSnackbar();
    const token = useSelector(state => state.adminTokenReducer)

    const addCategoriesToCSV = (responseData) => {
        if (!state.csvHeadersLoaded &&
            responseData.length > 0 && responseData[0].hasOwnProperty("categoryScores")) {
            for (let idx = 0; idx < responseData.length; ++idx) {
                if (responseData[idx].categoryScores.length > 0) {
                    console.log(responseData[idx])
                    for (let i = 0; i < responseData[idx].categoryScores.length; ++i) {
                        csvHeaders.push({
                            label: `${responseData[idx].categoryScores[i].category}(%)`,
                            key: `categoryScores[${i}].scoreInPercentage`
                        })
                    }
                    break;
                }
            }
        }
    }

    const fetchUsers = (start, end) => {
        setState({...state, dataLoading: true})
        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${token}`
        SERVER_URL.get(`${USERS_API}?startDate=${start}&endDate=${end}`)
            .then(response => {
                addCategoriesToCSV(JSON.parse(JSON.stringify(response.data)))
                setState({
                    ...state,
                    data: parseInt(response.status) !== 204 ? JSON.parse(JSON.stringify(response.data)) : null,
                    dataLoading: false,
                    csvHeadersLoaded: true,
                    httpCode: parseInt(response.status)
                })
                enqueueSnackbar(`Users data loaded successfully.`,
                    {
                        variant: "success",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })
            .catch(error => {
                if (error.response !== undefined) {
                    setState({
                        ...state,
                        loading: false,
                        httpCode: error.response !== null ? parseInt(error.response.status) : 500
                    })
                    enqueueSnackbar(`Unable to fetch users data.`,
                        {
                            variant: "error",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                } else {
                    setState({
                        ...state, loading: false, httpCode: 204
                    })
                }
            })
    }

    const convertDateToAPIFormat = (date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    const convertDateToStandardFormat = (date) => {
        return `${date.getMonth()}-${date.getDate() + 1}-${date.getFullYear()}`
    }

    useEffect(() => {
        console.log('Component Did Mount token = ' + token)

        if (token !== null) {
            fetchUsers(convertDateToAPIFormat(state.startDate), convertDateToAPIFormat(state.endDate))
        }

        // eslint-disable-next-line
    }, [token])

    const fetchStartDateHandler = (date) => {
        console.log('fetchStartDateHandler = ' + JSON.stringify(state.startDate))
        setState({...state, startDate: date})
    }

    const fetchEndDateHandler = (date) => {
        setState({...state, endDate: date})
    }

    const applyBtnHandler = () => {
        if (state.startDate > state.endDate) {
            enqueueSnackbar(`End date could not be before start date.`,
                {
                    variant: "error",
                    autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                    preventDuplicate: true
                })
            return
        }
        fetchUsers(convertDateToAPIFormat(state.startDate), convertDateToAPIFormat(state.endDate))
    }

    if (token === null) {
        return null
    }

    if (state.httpCode === 500) {
        // go here and check for error code
        // display error.
        // Internal server error
        return <InternalServerError/>
    }

    console.log(`CSV HEADER = ${JSON.stringify(csvHeaders)}`)

    return (
        <div className={classes.root}>
            <Grid container direction={"column"} justify={"center"}>
                <Grid item xs={12} style={{
                    fontWeight: "bold",
                    fontSize: "2rem", alignSelf: "center", paddingTop: 20
                }}>
                    Users Data
                </Grid>

                <Grid container spacing={2} alignItems={"flex-end"} style={{paddingLeft: 50}}>
                    <Grid item xs={2}>
                        <DatePicker name="Start Date" daysToSubtract={noOfPastDays}
                                    fetchDateHandler={fetchStartDateHandler}/>
                    </Grid>
                    <Grid item xs={2}>
                        <DatePicker name="End Date" daysToSubtract={0} fetchDateHandler={fetchEndDateHandler}/>
                    </Grid>
                    <Grid item xs={6} style={{paddingBottom: 15}}>
                        <Button variant="contained" startIcon={<PlaylistAddCheckIcon/>} color="primary"
                                onClick={applyBtnHandler}>
                            Apply
                        </Button>
                    </Grid>

                    <div style={{display: 'flex', flexGrow: 1}}/>

                    <Grid item xs={2} style={{paddingBottom: 15}}>
                        {state.data !== null ?
                            <Button variant="contained" style={{backgroundColor: DOWNLOAD_BUTTON_COLOR, color: "black"}}
                                    startIcon={<GetAppIcon/>}>
                                <CSVLink data={state.data} className={"exportButton"} headers={csvHeaders}
                                         filename={`Self-Assessment-Users-${convertDateToStandardFormat(state.startDate)}-to-${convertDateToStandardFormat(state.endDate)}.csv`}>
                                    Download CSV
                                </CSVLink>
                            </Button> : null}
                    </Grid>
                </Grid>

                {state.httpCode !== 204 ?
                    <VirtualTable data={state.data}
                                  actionColumnIndex={8}
                                  actionType={DOWNLOAD_ACTION_TYPE}
                                  rowHeight={60}
                                  attributes={userAttributes}/>
                    : <DataNotFound/>
                }

            </Grid>
            {state.loading ? <Loading/> : null}
        </div>
    );
}