import React, {useState} from 'react'
import {useSnackbar} from "notistack";
import GetAppIcon from '@material-ui/icons/GetApp';
import {useSelector} from "react-redux";
import {DOWNLOAD_BUTTON_COLOR, SNACKBAR_AUTO_HIDE_DURATION} from "../../../../constants/constants";
import {Button} from "@material-ui/core";
import {SERVER_URL} from "../../../../config/config";
import {ASSESSMENT_API} from "../../../../constants/api_routes";
import {generatePDF} from "../../../../helper/generatePDF";
import {Loading} from "../../../ui/common/Loading";
import {saveAs} from 'file-saver';

export function ResponsePdfDownloadButton({userId}) {
    const {enqueueSnackbar} = useSnackbar();
    const [state, setState] = useState({loading: false, httpCode: 200})
    const token = useSelector(state => state.adminTokenReducer)

    const pdfDownloadBtnHandler = () => {
        setState({...state, loading: true})

        SERVER_URL.defaults.headers.common['Authorization'] = `bearer ${token}`
        SERVER_URL.get(`${ASSESSMENT_API}/${userId}`)
            .then((response) => {
                setState({...state, loading: false, httpCode: 200})
                generatePDF(null, null, response.data).then((blob) => {
                    saveAs(blob, `${response.data.firstName}_${response.data.lastName}_Self_Assessment.pdf`);
                    setState({...state, loading: false})
                    enqueueSnackbar(`PDF downloaded successfully.`,
                        {
                            variant: "success",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                }).catch(() => {
                    setState({...state, loading: false})
                    enqueueSnackbar(`PDF downloaded failed.`,
                        {
                            variant: "error",
                            autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                            preventDuplicate: true
                        })
                })
            })
            .catch(error => {
                setState({
                    ...state, loading: false,
                    httpCode: error.response !== null ? parseInt(error.response.status) : 500
                })

                enqueueSnackbar(`Unable to fetch self-assessment data.`,
                    {
                        variant: "error",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })

    }

    return (
        <>
            <Button variant="contained"
                    fullWidth
                    startIcon={<GetAppIcon/>}
                    onClick={pdfDownloadBtnHandler}
                    style={{backgroundColor: DOWNLOAD_BUTTON_COLOR, color: 'white'}}>
                Response
            </Button>
            {state.loading ? <Loading/> : null}
        </>
    )
}
