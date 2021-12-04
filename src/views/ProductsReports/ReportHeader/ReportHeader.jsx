import { Grid, makeStyles, Typography,Card } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';

import moment from 'moment';
import { setDateFormat } from './../../../Util/Util';
import { Button } from '@material-ui/core';
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    display: 'flex',
    margin: '5px',
    textTransform: 'capitalize',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      padding: theme.spacing(1),

    },
  },
  title: {
    color: theme.palette.primary.light,
    display: 'inline',
    marginRight: '5px'
  },
  secondaryText: {
    color: "inherit",
    display: 'inline'
  },
  cardMain: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  btnGrp : {
    display : 'flex',
    marginLeft : 'auto',
    spacing : '10px'
  },
  reportBtn : {
    marginLeft :  '5px',
    height : '35px'
  }
}));



const ReportHeader = ({ header }) => {

  const classes = useStyles();

  const onClickReport = async (reportFormat) => {
    const url = `/report/fetch`;
    /*const url = `/report/project/reportname`;*/
    const response = await Axios.post(url, {
      projectId: header.projectId,
      Date : header.Date,
      team_id : header.team_id,
      company_id : header.company_id,
      fileType : reportFormat
    });

    console.log(response);
  }

  return (<>
    <Grid
      container
      spacing={1}
      className="report-main-title"
    >
      <Typography
        variant="h6"
        color="textPrimary"
        className={classes.title}
      >
        SCAN REPORT FOR {header.Project.toUpperCase()}
      </Typography>
      <div className={classes.btnGrp}>
        <Button variant="outlined" className = {classes.reportBtn} onClick={()=>onClickReport('html')}>HTML</Button>
        <Button variant="outlined" className = {classes.reportBtn} onClick={()=>onClickReport('pdf')}>PDF</Button>
        <Button variant="outlined" className = {classes.reportBtn} onClick={()=>onClickReport('json')}>JSON</Button>
      </div>
    </Grid>
    
    <Grid
      container
      spacing={1}
      className="report-main-box"
    >
      
      {Object.entries(header.display).map((severity) => (
        severity[1].field == 'Date'?
        ( <Grid
              item
              lg={4}
              md={6}
              sm={12}
              xs={12}
              xl={4}              
            >
           <Card key={severity[0]} className={classes.cardMain}>
            <Typography
              variant="h6"
              color="textPrimary"
              className={classes.title}
            >
              {severity[1].title}
            </Typography>
            <Typography className={classes.secondaryText}>
              {moment(setDateFormat(header[severity[1].field]).replace('_', ' ')).format("MMM DD, YYYY hh:mm a")}
            </Typography>
          </Card> </Grid>) : (<Grid
              item
              lg={4}
              md={6}
              sm={12}
              xs={12}
              xl={4}
            >
            <Card key={severity[0]} className={classes.cardMain}>
            <Typography
              variant="h6"
              color="textPrimary"
              className={classes.title}
            >
              {severity[1].title}
            </Typography>
            <Typography className={classes.secondaryText}>
              {header[severity[1].field]}
            </Typography>
          </Card> </Grid>
          ) 
      ))}
      
    </Grid>
  </>);
};

export default ReportHeader;