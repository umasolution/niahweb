import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Typography,
  makeStyles
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  }
}));

function TodaysMoney({ className,header, value, ...rest }) {
  const classes = useStyles();
  const data = {
    value: '24,000',
    currency: '$',
    difference: 4
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
         {header}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            variant="h3"
            color="textPrimary"
          >
            {value}
           
          </Typography>
          
        </Box>
      </Box>
     {/*  <Avatar className={classes.avatar}>
        <AttachMoneyIcon />
      </Avatar> */}
    </Card>
  );
}

TodaysMoney.propTypes = {
  className: PropTypes.string
};

export default TodaysMoney;
