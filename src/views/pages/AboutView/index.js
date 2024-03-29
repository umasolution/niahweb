import React from 'react';
import Page from 'src/components/Page';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  Avatar,
  Grid
} from '@material-ui/core';

import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily
  },
  pagetitle :{
    padding: "115px 0px 115px",
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right bottom",
    backgroundColor: "#1700a0",
    backgroundSize: "cover"
  },
  autocontainer : {

  },
  pagetitleH1 : {
    position: 'relative',
    fontWeight: '700',
    lineHeight: '1.2em',
    marginBottom: 15,
    fontSize: 60
  },
  pagetitleContent : {
    color: '#FFFFFF'
  },
  servicesblockfour:{
    position: 'relative',
    marginBottom: 30
  },
  innerbox : {
    position: 'relative',
    textAlign: 'center',
    padding: '0px 50px 60px',
    transition: 'all 1000ms ease',
    boxShadow: '0px 0px 15px rgba(0,0,0,0.15)',
    backgroundColor: '#ffffff',
    '&::before' : {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 0,
      height: 4,
      backgroundColor: '#eb2f5b',
      transition: 'all 1000ms ease'
    },
    '&:hover' : {
      transform: 'translateY(-20px)'
    },
  },
  innerboxH3 : {
    position: 'relative',
    fontWeight: 700,
    marginBottom: 14
  },
  innerboxtext : {
    padding: '10px',
    fontSize: '1.2rem'
  },
  iconbox :{
    position: 'relative',
    width: 118,
    height: 118,
    color: '#ffffff',
    fontSize: 50,
    textAlign: 'center',
    margin: '0 auto',
    borderRadius: '50%',
    marginTop: '-59px',
    display: 'inline-block',
    marginBottom: 24,
    transition: 'all 1000ms ease',
    backgroundImage: '-ms-linear-gradient(left, #F5389C 0%, #fe8243 100%)',
    backgroundImage: '-moz-linear-gradient(left, #F5389C 0%, #fe8243 100%)',
    backgroundImage: '-o-linear-gradient(left, #F5389C 0%, #fe8243 100%)',
    backgroundImage: '-webkit-gradient(linear, left top, right top, color-stop(0, #F5389C), color-stop(100, #fe8243))',
    backgroundImage: '-webkit-linear-gradient(left, #F5389C 0%, #fe8243 100%)',
    backgroundImage: 'linear-gradient(to right, #F5389C 0%, #fe8243 100%)'
  },
  servicesection :{
    position: 'relative',
    padding: '140px 0px 70px',
    backgroundColor: '#f2f3fa'
  }
  
}));


function AboutView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="About Us - Niah Security "
    >
    <Container maxWidth="xl" className={classes.pagetitle}>
      <Container maxWidth="lg" display="flex"
            justifycontent="center"
            alignitems="center"
            maxWidth="lg" 
            className={classes.pagetitleContent}
            >
           <Typography
              variant="h1"
              align="center"
              className={classes.pagetitleH1}
            >
           About Us
           </Typography>
       </Container> 
      </Container>
      <Container maxWidth="xl" className={classes.servicesection}>
        <Container maxWidth="lg" className={classes.servicestwo}>
        <Grid
            container
            spacing={4}
          >
          <Grid
              item
              md={12}
              xs={12}
              
              className={classes.servicesblockfour}
            >
            <div className={classes.innerbox}>
              <div className={classes.iconbox}>
                  
              </div>
            <div className={classes.innerboxtext}>
              With a mission to solve security problems for developers and enterprises, Niah Security is building free tools and commercial products to ensure code is developed with security built into the process as left as it can be. 
            </div>
            <div className={classes.innerboxtext}>
              Niah Security helps you embrace Open Source securely, confidently and fast. Niah Security's solutions identify Vulnerabilities and License risks. Our commercial tools allow you to even fix the vulnerabilities found during the process.
            </div>
            <div className={classes.innerboxtext}>
              Niah Security is run by a team that brings decades of experience in security research, vulnerability management, vulnerability research and penetration testing.
            </div>
            <div className={classes.innerboxtext}>
              Please reach out to us for any queries, demos, questions at 
            </div>
            <div className={classes.innerboxtext}>
              info@niahsecurity.io
            </div>
        </div>
            </Grid>
            
        </Grid>  
          </Container>
      </Container>
    </Page>
  );
}

export default AboutView;
