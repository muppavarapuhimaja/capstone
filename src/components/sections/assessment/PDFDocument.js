import React from 'react'
import {Document, Page, Text, View, Image, Link} from '@react-pdf/renderer'
import GalenLogo from '../../../images/galenLogo.png';
import {SCORE_GUIDANCE} from "../../../constants/constants";

const styles = {
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    image: {
        width: 100
    },
    appBar: {
        display: "flex",
        backgroundColor: '#1d2b3d',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
        flexBasis: '60%',
        color: 'white',
    },
    scorecard: {
        fontSize: 40,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'red',
        height: 170,
        display: 'flex',
        flexDirection: 'column',
    },
    accordion: {
        backgroundColor: "grey",
        height: 30,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        color: 'white',
        fontSize: 13,
        marginTop: 20
    },
    shortName: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        fontSize: 13
    },
    guidance: {
        color: 'red',
        display: 'flex',
        padding: '0px 5px 5px 5px',
        fontSize: 12
    },
    dataLabel: {
        backgroundColor: "#DCDCDC",
        height: 25,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        fontSize: 13
    },
    questions: {
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        fontSize: 13,
        textAlign: 'justify',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    nameHeading: {
        position: 'absolute',
        fontSize: 12,
        top: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
}

export function PDFDocument({scoreInfo, totalScore, data}) {
    let questionId = 0

    if (data === null) {
        return null
    }

    const renderAssessmentDataList = () => {
        return data.assessment.map(assessment => renderAssessmentData(assessment))
    }

    const renderAssessmentData = (assessment) => {
        return (
            <React.Fragment key={`a-${questionId}`}>
                {renderCategory(assessment.category)}
                {renderCategoryShortName(assessment.category.shortName)}
                {renderResponseGuidance(assessment.category.scoreGuidance)}
                {renderDataLabel()}
                {renderQuestions(assessment.questions, assessment.category.id)}
            </React.Fragment>
        )
    }


    const renderCategory = (category) => {
        return (
            <View style={styles.accordion} key={category.id}>
                <Text style={{paddingLeft: 15, flexGrow: 0.8}}>
                    {category.name}
                </Text>
                <Text>
                    {scoreInfo === null ? category.score : scoreInfo.get(category.id).categoryScore}
                </Text>
            </View>
        )
    }


    const renderCategoryShortName = (shortName) => {
        return (
            <Text style={styles.shortName}>
                {shortName}
            </Text>
        )
    }

    const renderResponseGuidance = (scoreGuidance) => {
        return (
            <Text style={styles.guidance}>
                {scoreGuidance}
            </Text>
        )
    }

    const renderDataLabel = () => {
        return (
            <View style={styles.dataLabel}>
                <Text style={{paddingLeft: 10, flexGrow: 0.05}}>
                    #
                </Text>
                <Text style={{flexGrow: 0.91}}>
                    Item
                </Text>
                <Text>
                    Response
                </Text>
            </View>
        )
    }

    const setupLinks = (str) => {
        if (str.search("href")) {
            const questionRegex = new RegExp("((?<=<a.*>).*(?=<\\/a>))");
            const questionResult = questionRegex.exec(str)
            const hrefRegex = new RegExp("((?<=href=\").*(?=\">))");
            const hrefResult = hrefRegex.exec(str)
            const remainingTextRegex = new RegExp("(?<=/a>).*$")
            const remainingTextResult = remainingTextRegex.exec(str)

            if (questionResult && questionResult.length > 0) {
                return (
                    <>
                        <Link src={hrefResult.length > 0 ? hrefResult[0] : null}>{questionResult[0]}</Link>
                        {remainingTextResult[0]}
                    </>
                )
            }
        }
        return str
    }

    const renderQuestions = (questions, categoryId) => {
        return questions.map(question => (
            <View style={styles.questions} key={question.id}>
                <Text style={{flexBasis: '5%', textAlign: 'center'}}>
                    {++questionId}
                </Text>

                <View style={{display: 'flex', flexDirection: 'column', flexBasis: '85%'}}>
                    <Text>
                        {setupLinks(question.description)}
                    </Text>
                </View>

                <Text style={{flexBasis: '5%'}}>
                    {scoreInfo === null ? question.response : scoreInfo.get(categoryId).questionResponse.get(question.id)}
                </Text>
            </View>
        ))
    }

    console.log(`Rendering PDFDocument....`)

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.nameHeading} fixed>{`${data.firstName} ${data.lastName}`}</Text>

                <View style={styles.appBar}>
                    <Image
                        style={{width: 100, padding: 10}}
                        src={GalenLogo}
                    />
                    <Text style={styles.title}>Cloud Connectivity Self-Assessment</Text>
                </View>

                <View style={styles.scorecard}>
                    <Text style={{
                        paddingTop: 10, color: `${totalScore < 185 ? 'red'
                            : totalScore < 325 ? 'orange' : 'green'}`
                    }}>
                        {totalScore === null ? data.totalScore : totalScore}
                    </Text>
                    <Text style={{
                        fontSize: 14, color: "#839aa9",
                        fontWeight: 600, paddingTop: 10
                    }}>
                        SCORE
                    </Text>
                    <View style={{
                        fontSize: 12, color: "#839aa9", textAlign: 'justify',
                        fontWeight: 600, backgroundColor: 'black',
                        display: 'flex', paddingLeft: 10, paddingTop: 20
                    }}>
                        {
                            SCORE_GUIDANCE.map(({range, advice, color}) => {
                                return <Text key={range}>
                                    <Text style={{color: color}}>{range} : </Text>{advice}
                                </Text>
                            })
                        }
                    </View>
                </View>
                {renderAssessmentDataList()}

                <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed/>
            </Page>
        </Document>
    )
}
