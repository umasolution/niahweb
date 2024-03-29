import { Container, Grid, LinearProgress, makeStyles, TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tab from '@material-ui/core/Tab';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import CONSTANTS from "../../Util/Constants";
import Copy from "../../Util/Copy";
import CVETextField from './../CVE/CVEInput/CVETextField';
import './Feed.css';
import TabsData from './TabsData/TabsData';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'inherit',
    },
    checkBoxes: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px',
        textTransform: 'capitalize',
        justifyContent: 'space-between',
        width: '100%',
    }
}));

export const Feed = (/* {   } */) => {

    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);
    const [loadingTabs, setLoadingTabs] = useState(false);
    const [tabsName, setTabsName] = useState([]);
    const [tabsData, setTabsData] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { feedType } = useParams();
    const [reportTypes, setReportTypes] = useState([]);
    const [cveInput, setCVEInput] = useState("");

    useEffect(() => {
        fetchFeed();
    }, [feedType]);

    const fetchFeed = async () => {
        try {
            setLoadingTabs(true);
            
            const url = "/vuln";
            let response = await Axios.get(url);
            response = response.data['report type'];
            response.forEach(res => res.isShowing = true);
            setTabsData(response);
            const reportTypes = response.map(d => d['report type'])
            setReportTypes(reportTypes);
            setTabsName([feedType]);
            
            setLoadingTabs(false);
        } catch (error) {
            console.error(error);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
            setLoadingTabs(false);
        }
    }

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const getTabs = () => {
        if (tabsName && tabsName.length > 0) {
            return tabsName.map(tab => {
                return <Tab label={tab} key={tab} />
            })
        }
    }

    const fetchFeedData = async (data, tabIndexParams, reportType) => {
        const url = `${data.uri}`;;
        const response = await Axios.get(url);
        if (response.data) {
            const copy = Copy(tabsData);
            const copyData = copy.find(d => d['report type'] === reportType);
            const orginalData = copyData.results.find((d) => d.appName === data.appName);
            orginalData.tableData = response.data;
            const linkColumn = orginalData.tableData.columns[0];
            linkColumn.render = (rowData) => {
                return <Link target="_blank" to={`/CVE/${rowData.cve_id}`}>{rowData.cve_id}</Link>
            }
            setTabsData(copy);
        }
    }

    const expandPanel = (event, expanded, tabData, reportType) => {
        if (expanded && !tabData.tableData) {
            fetchFeedData(tabData, tabIndex, reportType);
        }
    }

    const handleCheckBoxChange = (event, type) => {
        const copy = Copy(tabsData);
        const report = copy.find(data => data['report type'] === type);
        if (report) {
            report.isShowing = event.target.checked;
            setTabsData(copy);
        }

    }


    const handleChangeCVE = (event) => {
        setCVEInput(event.target.value);
    };

    const getTabsData = () => {
        return (
            <>
                <div className={classes.checkBoxes}>
                    <div>
                        {
                            reportTypes.map(type => (
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            checked={tabsData.findIndex(res => res['report type'] === type && res.isShowing) !== -1}
                                            onChange={(event) => handleCheckBoxChange(event, type)}
                                            name={type}
                                            color="primary"
                                        />
                                    )}
                                    label={type}
                                />
                            )
                            )
                        }
                    </div>
                    <div>
                        <TextField
                            required
                            value={cveInput}
                            onChange={handleChangeCVE}
                            style={{
                                width: "200px",
                                background: "white",
                                borderRadius: '8px',
                            }}
                            id="cve"
                            placeholder="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                </div>
                {
                    tabsData.map(data =>
                        {
                            const result = data.results.filter(d => d.appName.toLowerCase().includes(cveInput));
                        return (data.isShowing) ?
                            <TabsData bgcolor={data.bgcolor} reportType={data['report type']}
                                tabsData={result} expandPanel={expandPanel} />
                            : ''
                        }
                    )
                }
            </>
        )
    }

    const getLoader = () => {
        if (loadingTabs) {
            return <LinearProgress style={{ margin: '15px' }} />
        }
        return null;
    }

    const updateSnackbar = (open, message) => {
        setSnackbarOpen(open);
        setSnackbarMessage(message)
    }

    return (
        <Container style={{ paddingLeft: '0px', paddingRight: '0px', maxWidth: 'unset' }} maxWidth="lg">
            <Grid style={{ width: '100%' }} container spacing={1}>
                {loadingTabs ? getLoader() : null}
                {tabsData.length > 0 && getTabsData()}
                <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />
            </Grid>
        </Container>
    );
};

export default Feed;