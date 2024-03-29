import React,{useState,useRef, createRef} from 'react';
import {
    Grid,
    Typography,
    makeStyles,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tooltip,IconButton
} from '@material-ui/core';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import clsx from 'clsx';

import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './AlertList.css';
import PopoverContent from './PopoverContent';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme) => ({
    grid:{
      marginTop:'3px'
    },
    icon:{

        margin:'7px',
     
    },
    accordion :
    {
    
        /*padding:'10px',
        marginLeft:'11px'*/
        width:'100%',
        
      
    },
    unreadMail:{
      
        color:"grey",
        fontWeight:'300',
        width:'100%',
        marginTop: '12px',
        marginLeft:'20px',      
    },
    
    readMail :{
        marginTop: '12px',
        marginLeft:'20px',         
        fontWeight:'500',
        width:'100%',
        color:'black'

    },
   /* unreadMailbgr:{
        backgroundColor:theme.palette.grey[100],
     
    },
    readMailbgr : {
        backgroundColor:'white',
      
    }*/
}));

const AlertList = ({ alertList,changeAlertmsgStatus,changeMsgReadtoUnread,deleteAlert}) => {

    const classes = useStyles();
    const [mailStatus,setMailStatus]=useState("");
    const [openId,setOpenId] = useState(-1);
  
   const changeSetOpenId = (index) => {
       if(openId=== index)
       {
           setOpenId(-1);
        }
        else
        {
           setOpenId(index);
        }
   }

    const onHandleChange=(alerts,index) => {
        if (alerts.status === "read")
        {
            changeMsgReadtoUnread(alerts,index);
            
            
        }
    };

   const onHandleClick = (e,alerts,index) => {
       
        e.stopPropagation();
        if(alerts.status === "read")
        {
            changeMsgReadtoUnread(alerts,index);
          
        }
        else
        {
       changeAlertmsgStatus(alerts,index);
      
        }
    };

    const onDeleteAlert = (e,alerts,index) => {
        e.stopPropagation();
      deleteAlert(alerts,index);
    }
  
   

    return (
        <Grid container spacing={0} className={classes.grid}>
            {
                alertList.map((alerts, index) => {
                    return (
                        <>
                      
                        
                        <Accordion key={index}  className={classes.accordion} onClick={(e)=>onHandleChange(alerts,index)}  expanded={index === openId} onChange={() => { changeSetOpenId(index) }}>
                            <AccordionSummary  >
                                <Grid item justify="center" xs={2}>
                                    <Typography  style={{wordWrap:"break-word"}} variant="body1" component="h4"  className={alerts.status === "read"?classes.readMail:classes.unreadMail} > 
                                        {alerts.alert_name}
                                    </Typography>
                                       
                                </Grid>
                                <Grid item alignItems="center" xs={2}>
                                    <Typography   variant="body1" component="h4" className={alerts.status === "read" ?classes.readMail:classes.unreadMail}>
                                        {alerts.alert_type}
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Grid container>
                                        <Grid item  xs={9}>
                                        <Typography variant="body1" className={alerts.status === "read" ?classes.readMail:classes.unreadMail}>
                                           {/*{alerts.message}*/}
                                           New Alert found for {alerts.alert_name}
                                        </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Grid container justify="flex-end" spacing={1} style={{ margin: '3px' }}>
                                                    <Grid item xs={4} lg={2}>
                                                        {alerts.status === "read" ? <Tooltip title="Mark as read">
                                                            <MarkunreadIcon fontSize="small" className={classes.icon} color="disabled" onClick={(e) => onHandleClick(e, alerts, index)} />
                                                        </Tooltip> : <Tooltip title="Mark as unread">
                                                            <DraftsIcon fontSize="small" className={classes.icon} color="disabled" onClick={(e) => onHandleClick(e, alerts, index)} />
                                                        </Tooltip>}
                                                    </Grid>
                                                    <Grid item xs={4} lg={2}>
                                                        <PopoverContent />
                                                    </Grid>

                                                    <Grid item xs={4} lg={2}>
                                                        <Tooltip title="Delete">
                                                            <DeleteIcon fontSize="small" className={classes.icon} color="disabled" onClick={(e) => onDeleteAlert(e, alerts, index)} />
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                    <Grid item xs={1}  >
                                        <Grid justify="space-around" alignItems= "center">
                                    <IconButton aria-label="expand row" size="small" onClick={() => changeSetOpenId(index)}>
                                            {openId===index ? <KeyboardArrowUpIcon  style= {{marginTop:"10px",marginLeft:"5px"}}/> : <KeyboardArrowDownIcon  style= {{marginTop:"10px",marginLeft:"5px"}}/>}
                                        </IconButton>
                                        </Grid>
                                    </Grid>
                            </AccordionSummary>
                            <AccordionDetails style={{justifyContent:'center'}}>
                               
                   
                                  {alerts.messages?(alerts.messages).map((msg) => {
                                                return(
                                                    <div>
                                                    <Typography variant="h6" component="h4" align="justify" >
                                                    {msg}
                                                     </Typography>
                                                    <hr/>
                                                    </div>
                                                )
                                            }):"" }
                           
                                         
                                       
                            </AccordionDetails>
                        </Accordion>
                        </>
                    )
                })
            }

        </Grid>
    )
};

export default AlertList;