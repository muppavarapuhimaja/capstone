import React, {useState} from 'react'
import {ButtonWithToolTip} from "../../ui/assessment/ButtonWithToolTip";
import {useSnackbar} from "notistack";
import {SNACKBAR_AUTO_HIDE_DURATION} from "../../../constants/constants";
import GetAppIcon from '@material-ui/icons/GetApp';
import {Loading} from "../../ui/common/Loading";
import {useSelector} from "react-redux";
import {generatePDF} from "../../../helper/generatePDF";
import {saveAs} from 'file-saver';

export function PdfDownloadButton() {
    const {enqueueSnackbar} = useSnackbar();
    const {scoreInfo, totalScore} = useSelector(state => state.totalScoreReducer)
    const {data} = useSelector(state => state.assessmentDataReducer)
    const [state, setState] = useState({loading: false})

    const pdfDownloadBtnHandler = () => {
        setState({...state, loading: true})
        generatePDF(scoreInfo, totalScore, data).then((blob) => {
            saveAs(blob, `${data.firstName}_${data.lastName}_Self_Assessment.pdf`);
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
    }

    return (
        <>
            <ButtonWithToolTip text="PDF" icon={<GetAppIcon/>}
                               position="top"
                               btnHandler={pdfDownloadBtnHandler}
                               tooltip="Download your responses."/>)}
            {state.loading ? <Loading/> : null}
        </>
    )
}
