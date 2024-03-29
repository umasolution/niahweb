import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import MinivariantNavBar from './MinivariantNavBar';
import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
   /* [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }*/
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

function DashboardLayout({ children }) {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
     {/*<TopBar onMobileNavOpen={() => setMobileNavOpen(true)} /> 
      <div className="user-nav">
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        
      </div>*/}
      <MinivariantNavBar />
      <div className={classes.wrapper} style={{ backgroundColor: '#f1f1f1' }}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.any
};

export default DashboardLayout;
