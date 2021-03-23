import React from 'react';
import {Grid, Divider} from "@material-ui/core";
import Modal from "./Modal";

export const ModalConfirmationDialog = (props) => {

    const renderDialogBox = () => {
        return (
            <Grid container direction="column">

                <Grid item container direction="column" style={{padding: "0.7em"}}>
                    <Grid item
                          style={{color: "#9c9917", fontSize: 18, fontWeight: "bolder", paddingBottom: "1rem"}}>
                        Warning
                    </Grid>
                    <Grid item style={{color: "black", fontSize: 14, fontWeight: 600}}>
                        {props.question}
                    </Grid>
                </Grid>

                <Grid item>
                    <Divider style={{width: "inherit", height: 1}}/>
                </Grid>
                <Grid item container alignItems="center" style={{textAlignLast: "center"}}>
                    <Grid item xs={6} onClick={props.confirmedHandler} style={{
                        color: "red", fontWeight: "bold", cursor: "pointer", textAlign: 'center'
                    }}>
                        Yes
                    </Grid>
                    <Divider orientation="vertical" style={{width: 1, height: 45}}/>
                    <Grid item xs={5} onClick={props.cancelHandler}
                          style={{fontWeight: "bold", cursor: "pointer", paddingLeft: "1.3rem",
                              textAlign: 'center'}}>
                        No
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <Modal renderWarningComponent={renderDialogBox()}
               modalWidth="400px"
               closeHandler={props.cancelHandler}/>
    )
}