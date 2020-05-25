import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
  TextField
} from '@material-ui/core';
import {
  withRouter
} from 'react-router-dom';
import moment from 'moment';
import CVEInput from './../../CVE/CVEInput/CVEInput';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 20,
    paddingBottom: 200,
    [theme.breakpoints.down('md')]: {
      paddingTop: 60,
      paddingBottom: 60
    }
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '90%',
      height: 'auto',
      transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16]
    }
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '90%',
      height: 'auto'
    }
  },
  container: {
    marginTop: '50px'
  },
  mainContent: {
    background: '-webkit-linear-gradient(330.58deg,#70389f,#31358e 79.71%)',
    padding: '10px'
  },
  mainContentH3: {
    fontFamily: 'PrentonRPProLight,sans-serif',
    fontWeight: '200',
    fontSize: '48px',
    color: '#fff'
  },
  mainContentH2: {
    fontSize: '48px',
    color: '#fff',
    marginBottom: '25px'
  },
  mainContentP: {
    color: '#fff'
  }

}));

function Hero({ className, ...rest }) {
  const classes = useStyles();

  const { history } = { ...rest };
  const [searchByCVE, setSearchByCVE] = useState(true);
  const [cveInput, setCVEInput] = useState("");
  const [cveSearchStartDate, setCVESearchStartDate] = useState(new Date());
  const [cveSearchEndDate, setCVESearchEndDate] = useState(new Date());

  const handleChangeCVE = (event) => {
    setCVEInput(event.target.value);
  }
  const changeSearchByCVE = (event) => {
    setSearchByCVE(event.target.checked);
  };

  const onSearchClicked = () => {
    if (searchByCVE) {
      history.push(`/CVE/${cveInput}`);
    } else {
      // history.push(`/CVE/${moment(cveSearchStartDate).format("YYYY-MM-DD")}/${moment(cveSearchEndDate).format("YYYY-MM-DD")}`);
      history.push(`/CVE/${cveSearchStartDate}/${cveSearchEndDate}`);
    }
  }

  const keyPress = (event) => {
    if (event.keyCode === 13) {
      onSearchClicked();
    }
  }

  const setCVESearchDate = (dateType, date) => {
    if (dateType === 'startDate') {
      setCVESearchStartDate(date);
    } else {
      setCVESearchEndDate(date);
    }
  }

  const gotoRegister = () => {
    history.replace('/register')
  }


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <TextField
          required
          value={cveInput}
          onKeyDown={keyPress}
          onChange={handleChangeCVE}
          style={{
            width: '500px'
          }}
          id="cve"
          placeholder="Search Vulnerabilities"
          label="Search Vulnerabilities"
        />
        <Grid
          container
          spacing={3}
          className={classes.container}
        >
          <Grid
            item
            xs={12}
            md={5}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <div className={classes.mainContent}>
                <h3 className={classes.mainContentH3}>Develop fast.</h3>
                <h2 className={classes.mainContentH2}>Stay secure.</h2>
                <p className={classes.mainContentP}>Enabling more than 400,000 developers to continuously find and fix vulnerabilities in open source libraries and containers.</p>
              </div>
              <Box mt={3}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item>
                    <Typography
                      variant="h1"
                      color="secondary"
                    >
                      30+
                    </Typography>
                    <Typography
                      variant="overline"
                      color="textSecondary"
                    >
                      Demo Pages
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h1"
                      color="secondary"
                    >
                      UX
                    </Typography>
                    <Typography
                      variant="overline"
                      color="textSecondary"
                    >
                      Complete Flows
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h1"
                      color="secondary"
                    >
                      300+
                    </Typography>
                    <Typography
                      variant="overline"
                      color="textSecondary"
                    >
                      Components
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button
                color="secondary"
                size="large"
                type="button"
                variant="contained"
                onClick={gotoRegister}
              >
                SIGN UP FOR A FREE ACCOUNT
        </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
          >
            <Box position="relative">
              <div className={classes.shape}>
                <img
                  alt="Shapes"
                  src="/static/home/shapes.svg"
                />
              </div>
              <div className={classes.image}>
                <img
                  alt="Presentation"
                  src="/static/home/dark-light.png"
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Hero.propTypes = {
  className: PropTypes.string
};

export default withRouter(Hero);
