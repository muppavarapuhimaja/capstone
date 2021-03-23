import React, {useState} from 'react'
import {ButtonWithToolTip} from "../../ui/assessment/ButtonWithToolTip";
import {useSnackbar} from "notistack";
import {SNACKBAR_AUTO_HIDE_DURATION} from "../../../constants/constants";
import EmailIcon from "@material-ui/icons/Email";
import {Loading} from "../../ui/common/Loading";
import {SERVER_URL} from "../../../config/config";
import {EMAIL_PDF_API} from "../../../constants/api_routes";
import {useSelector} from "react-redux";
import {generatePDF} from "../../../helper/generatePDF";

export function PdfEmailButton() {
    const {enqueueSnackbar} = useSnackbar();
    const {scoreInfo, totalScore} = useSelector(state => state.totalScoreReducer)
    const {data} = useSelector(state => state.assessmentDataReducer)
    const [state, setState] = useState({loading: false})

    const sendPDFViaEmail = (blob) => {
        const formData = new FormData();
        const file = new File([blob], 'generatedPDF.pdf',
            {type: 'application/pdf', lastModified: Date.now()});
        formData.append('file', file);

        SERVER_URL.post(EMAIL_PDF_API, formData)
            .catch(() => {
                enqueueSnackbar(`Unable to email pdf.`,
                    {
                        variant: "error",
                        autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                        preventDuplicate: true
                    })
            })
    }

    const pdfEmailBtnHandler = () => {

        setState({...state, loading: true})
        generatePDF(scoreInfo, totalScore, data).then((blob) => {
            sendPDFViaEmail(blob)
            setState({...state, loading: false})
            enqueueSnackbar(`PDF emailed successfully.`,
                {
                    variant: "success",
                    autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                    preventDuplicate: true
                })
        }).catch(() => {
            setState({...state, loading: false})
            enqueueSnackbar(`Unable to generate pdf.`,
                {
                    variant: "error",
                    autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION,
                    preventDuplicate: true
                })
        })
    }

    return (
        <>
            <ButtonWithToolTip text="PDF" icon={<EmailIcon/>}
                               position="bottom"
                               btnHandler={pdfEmailBtnHandler}
                               tooltip="Email your responses."/>)}
            {state.loading ? <Loading/> : null}
        </>
    )
}
