import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Tabs, Tab, Hidden} from '@material-ui/core';
import '../../../styles/css/assessment/ResponseButton.css';

const useStyles = makeStyles((theme) => ({
    tabsRoot: {
        maxWidth: "fit-content"
    },
    tabsFlexContainer: {
        margin: 10
    },
    tabsIndicator: {
        backgroundColor: "transparent"
    },
    tabRoot: {
        borderRadius: 30,
        padding: 0,
        minHeight: 40,
        minWidth: 40,
        marginRight: 5,
        [theme.breakpoints.down('xs')]: {
            // alignSelf: 'flex-start'
        }
    },
    tabSelected: {
        backgroundColor: "darkorange",
        color: "white",
        boxShadow: "-1px -1px 12px rgba(0, 0, 0, 0.3)"
    }
}));

export default function SimpleTabs(props) {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        props.responseHandler(props.questionId, props.categoryId, newValue);
    };

    const renderTab = () => {
        const noOfTab = 6;
        const tabList = Array.from({length: noOfTab}, (_, index) => index++);
        return tabList.map(tabVal => {
            return <Tab key={tabVal} className="score-tabs"
                        classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                        label={tabVal.toString()} value={tabVal}/>

        })
    }

    return (
        <>
            <Hidden smDown>
                <Tabs style={{maxWidth: "fit-content"}} value={props.tabValue} onChange={handleChange}
                      classes={{
                          root: classes.tabsRoot, flexContainer: classes.tabsFlexContainer,
                          indicator: classes.tabsIndicator
                      }}>
                    {renderTab()}
                </Tabs>
            </Hidden>

            <Hidden mdUp>
                <Tabs style={{maxWidth: "fit-content"}} orientation={"vertical"}
                      value={props.tabValue} onChange={handleChange}
                      classes={{
                          root: classes.tabsRoot, flexContainer: classes.tabsFlexContainer,
                          indicator: classes.tabsIndicator
                      }}>
                    {renderTab()}
                </Tabs>
            </Hidden>
        </>
    );
}
