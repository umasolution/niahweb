import React,{useEffect,useState} from 'react';

import Page from 'src/components/Page';
import {Box,
        Container,
        Grid,
        LinearProgress,
        makeStyles} from '@material-ui/core';
import Axios from 'axios';

import IntroCard from './IntroCard';
import AlertTableHeader from './AlertTableHeader';
import AlertList from './AlertList';
import FirstTimeUserMsg from './FirstTimeUserMsg';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },

}));

const AlertsResponse = () =>{
    const classes = useStyles();
    const [alertsList,setAlertsList]=useState("");
    const [isLoadingData,setLoadingData]=useState('true');
  

    const getAlertList = async () =>{
        const url =`/alerts/lists`;
        const response = await Axios.get(url);
        if(!response.data){
            return;
        }
       
        setAlertsList(response.data);
        setLoadingData(false);
    };

    const getLoader = () => {
        if (isLoadingData) {
          return <LinearProgress style={{ margin: '15px', width: '100%' }} />
        }
        return null;
      }

    const changeMsgStatus = async (alerts, index) => {
        try {
            const url = `/status/delalert`;
            const response = await Axios.post(url, {
                "alert_type": alerts.alert_type,
                "alert_name": alerts.alert_name,
                "alert_mode": alerts.alert_mode
            });
            const tempAlertsList = alertsList.map((tempalerts, alertsIndex) => {

                return alertsIndex === index ? { ...tempalerts, status: 'read' } : tempalerts

            });
            setAlertsList(tempAlertsList);
            console.log(tempAlertsList);

        } catch (error) {
            console.log(error);
        }
    };

    const changeReadtoUnread =async (alerts,index) => {

        try {
            const url = `/status/setalert`;
            const response = await Axios.post(url, {
                "alert_type": alerts.alert_type,
                "alert_name": alerts.alert_name,
                "alert_mode": alerts.alert_mode
            });

            const tempAlertsList = alertsList.map((tempalerts, alertsIndex) => {

                return alertsIndex === index ? { ...tempalerts, status: 'unread' } : tempalerts

            });
            setAlertsList(tempAlertsList);
            console.log(tempAlertsList);
        } catch (error) {
            console.log(error);
        }

    };

    const deleteAlert = async(alerts,index) => {
        try {
            const url = `/delalert`;
            const response = await Axios.post(url, {
                "alert_type": alerts.alert_type,
                "alert_name": alerts.alert_name,
                "alert_mode": alerts.alert_mode
            });
            const tempAlertsList = alertsList.filter((tempalerts,alertsindex) => alertsindex !== index);
            setAlertsList(tempAlertsList);
        }
        catch (error) {
            console.log(error);
        }


    };


    useEffect(()=>{
        getAlertList();
    },[]);

   

    const headerColumns=[
        "Alert Title",
        "Type",
        "Detail"
        ];
    return (
     
            <Page title="Alerts" className={classes.root}>
                <Container maxWidth={false}>
                <IntroCard/>
               {isLoadingData?getLoader():
                alertsList && (alertsList.length>0) ?<Grid container>
                <Grid item xs={12}>
                <AlertTableHeader columns= {headerColumns} /> 
                </Grid>
                <Grid item xs={12}>
                <AlertList alertList={alertsList} changeAlertmsgStatus ={changeMsgStatus} changeMsgReadtoUnread={changeReadtoUnread} deleteAlert={deleteAlert} />
                </Grid>   
                </Grid> :<FirstTimeUserMsg />}    
                </Container>              
            </Page>

    );
};

export default AlertsResponse;
   {/*const [alertsResponse,setAlertsResponse]=useState("");
    const [alertsList,setAlertsList]=useState("");

    const getAlerts = async () =>{
        const url =  `corner/getalert`;
        const response = await Axios.get(url);
        if(!response.data){
            return;
        }
        console.log("1",response.data)
        setAlertsResponse(response.data);
    };
    
    const getAlertslist = async () => {
        const url =`/alerts/lists`;
        const response = await Axios.get(url);
        if(!response.data){
            return;
        }
        console.log("2",response.data);
        setAlertsList(response.data);

    };

    const printAlerts = () => {
        return (
            <div>
                {Object.entries(alertsList).map(([index,alert],keyindex)=>{
                    return(
                        <div key={keyindex}>
                        <div>Alert Title:{alert.alert_name}<br/>
                        Alert Type:{alert.alert_type}<br/>
                        Details:{alert.alert_message}<hr/></div>
                        </div>
                    )
                })}
                <Box>
                    {alertsResponse.map((alertmsg,index) => {
                        return (
                            <div key ={index}>Message:{alertmsg.message}<br/></div>
                        )
                    }
                    )
                }
                </Box>
            </div>
        );

    };

    useEffect (()=>{
        getAlerts();
        getAlertslist();
    },[]);


return (
    <Page title="Alerts">
        <div>
            {alertsResponse && printAlerts()}
        </div>
    </Page>
)*/}


