import * as React from 'react';
import { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, Divider, makeStyles, LinearProgress } from '@material-ui/core';
import { Component } from '@fullcalendar/core';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { filterRepoByText, setConnectedRepos, setConnectorList, setIntegrations } from 'src/actions/integrationActions';
import {
    Card,
    CardContent,
    CardHeader
} from '@material-ui/core';




const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    roundedCorner: '5px',
    boxShadow: 10,
    p: 4,
}

const useStyles = makeStyles(theme => ({
    txt: {
        width: '100%'
    },
    description: {
        marginTop: '10px'
    },
    save: {
        backgroundColor: 'rgb(25, 118, 210)',
        color: 'rgb(255, 255, 255)'
    },
    error: {
        color: 'red'
    },
    disconnect: {
        backgroundColor: 'rgb(211, 47, 47)',
        color: 'rgb(255, 255, 255)'
    },
    lbl: {
        fontStyle: 'bold'
    },
    center: {

        textAlign: 'center'

    },
    connector: {
        width: '10%',
        height: '100%',
        cursor: 'pointer'
    },
    txt : {
        width : '100%'
    },
    description: {
        marginTop:'10px'
    },
    content:{
        marginTop : '10px'
    },
    repoCheck : {
        marginRight : '10px'
    },
    search:{
        backgroundColor : 'rgb(25, 118, 210)',
        color:'rgb(255, 255, 255)'
    }
}));

export default function ProjectModal({ open, onClose }) {

    const dispatch = useDispatch();

    const styles = useStyles();

    const connectorList = useSelector(state => state.integrations.connectorList);
    const connectedRepos = useSelector(state => state.integrations.filteredRepo);

    const [fade, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [connectorClicked, setConnectorClicked] = useState(false);
    const [searchTxt,setSearchTxt] = useState('');


    const handleClose = () => {
        onClose();

    }

    useEffect(() => {
        setOpen(open);

        if (open) {
            const connectors = getConnectorList();
            console.log(connectors);
        }
    }, [open]);

    const getConnectorList = async () => {
        const url = "/integration/add/lists";
        let response = await Axios.post(url);

        dispatch(setConnectorList(response.data));

    }

    const onClickConnector = async (connector) => {
        setLoading(true);
        

        const url = "/projects/details";
        let response = await Axios.post(url,connector);

        setLoading(false);
        setConnectorClicked(true);

        dispatch(setConnectedRepos(response.data))
    }

    const onSearch = () => {
        dispatch(filterRepoByText(searchTxt))
    }

    const getContentBasedOnConnector = () => {
        if(!connectorClicked)
            return '';

        return(
            <Grid container spacing={1} className={styles.content}>
                            <Grid item xs={11}>
                                <TextField className={styles.txt}
                                    variant="outlined"
                                    label={connectedRepos.search_text}
                                    onChange = {event=>setSearchTxt(event.target.value)}
                                    value = {searchTxt}
                                />
                           
                            </Grid>
                            <Grid item xs={1} className={styles.description}>
                                <Button variant="contained" className={styles.search} onClick={onSearch}>Search</Button>
                            </Grid>
                            <Grid item xs={12} className={styles.description}>
                                <label>{connectedRepos.caption_text}</label>
                            </Grid>
                           
                            <Grid item xs={12} className={styles.description}>
                                {connectedRepos.data.map(repo => (
                                        <div>
                                            <input type='checkbox' className={styles.repoCheck}/>
                                            <label>{repo[connectedRepos.display_header]}</label>
                                        </div>
                                    )
                                )}
                            </Grid>

                        </Grid>
        )
        
    }

    const getLoader = () => {
        if (loading) {
            return <LinearProgress style={{ margin: '15px' }} />
        }
        return null;
    }

    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-descriptionribedby="transition-modal-descriptionription"
                open={fade}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={fade}>
                    <Box sx={style}>
                        <Grid container spacing={1} >



                            {
                                connectorList.map(connector => (
                                    <Card className="card" className={styles.connector} onClick={()=>onClickConnector(connector)}>
                                        <CardContent className="card-content">
                                            <div >
                                                <div>
                                                    <img src={"/static/integrations/ECR.png"} onError={(e) => e.target.src = "/static/integrations/GitLab.png"} />

                                                </div>
                                                <div className={styles.center}>
                                                    {connector.application}
                                                </div>
                                            </div>

                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </Grid>
                        {loading ? getLoader() : getContentBasedOnConnector()}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
