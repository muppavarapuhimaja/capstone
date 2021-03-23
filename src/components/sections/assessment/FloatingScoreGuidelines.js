import React, {useState} from 'react';
import '../../../styles/css/assessment/scoringGuidance.css'
import {Button} from "@material-ui/core";
import ScoringGuidanceTable from "../../ui/assessment/ScoringGuidanceTable";

const FloatingScoreGuidelines = () => {
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setChecked((prev) => !prev);
    };

    return (
        <>
            <div className={`floatButton ${checked ? `open` : ``}`}>
                <Button variant="contained" onClick={handleClick} style={{backgroundColor: "#de5950"}}>
                    Scoring Guidance
                </Button>
            </div>
            <div className={`scoringGuidanceTable ${checked ? `open` : ``}`}>
                <div className="scoringGuidanceTableInner">
                    <ScoringGuidanceTable/>
                </div>
            </div>
        </>
    );
}

export default React.memo(FloatingScoreGuidelines)
