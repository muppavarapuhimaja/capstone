import {pdf} from "@react-pdf/renderer";
import React from "react";
import {PDFDocument} from "../components/sections/assessment/PDFDocument";

export const generatePDF = async (scoreInfo, totalScore, data) => {
    const blob = await pdf(
        <PDFDocument scoreInfo={scoreInfo} totalScore={totalScore} data={data}/>
    ).toBlob();
    return blob
}
