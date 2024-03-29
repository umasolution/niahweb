/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles,
  IconButton,
  SvgIcon
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  ShoppingCart as ShoppingCartIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  UserPlus as UserPlusIcon,
  Shield as ShieldIcon,
  AlertCircle as AlertCircleIcon,
  Trello as TrelloIcon,
  User as UserIcon,
  Layout as LayoutIcon,
  Edit as EditIcon,
  DollarSign as DollarSignIcon,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  PieChart as PieChartIcon,
  Share2 as ShareIcon,
  Users as UsersIcon,
  Home as HomeIcon,
  Bell as BellIcon,
} from 'react-feather';

import Logo from 'src/components/Logo';
import "./index.css";
import NavItem from './NavItem';
import authService from './../../../services/authService';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { THEMES } from 'src/constants';
import Badge from '@material-ui/core/Badge';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';
const userName = authService.getUserName();



const navConfig = [
  {
    subheader: '',
    items: [
      {
        title: 'Dashboard',
        icon: HomeIcon,
        href: '/app/reports/dashboard'
      } 
    ]
  },
  {
    subheader: '',
    href: '',
    items: [
      {
        title: 'Vulnerabilities DB',
        icon: UsersIcon,
        href: '/app/vulDB',
      },
    ]
  },
  {
    subheader: '',
    items: [
      {
        title: 'My Scans',
        icon: UsersIcon,
        href: '/app/management/ProjectsReports/language',
      },
      {
        title: 'Alerts',
        icon: NotificationsIcon,
        href: '/app/management/Alerts',        
      }
    ]
  },
 /*  {
    subheader: 'Applications',
    items: [
      {
        title: 'Projects Platform',
        href: '/app/projects',
        icon: BriefcaseIcon,
        items: [
          {
            title: 'Overview',
            href: '/app/projects/overview'
          },
          {
            title: 'Browse Projects',
            href: '/app/projects/browse'
          },
          {
            title: 'Create Project',
            href: '/app/projects/create'
          },
          {
            title: 'View Project',
            href: '/app/projects/1'
          }
        ]
      },
      {
        title: 'Social Platform',
        href: '/app/social',
        icon: ShareIcon,
        items: [
          {
            title: 'Profile',
            href: '/app/social/profile'
          },
          {
            title: 'Feed',
            href: '/app/social/feed'
          }
        ]
      },
      {
        title: 'Kanban',
        href: '/app/kanban',
        icon: TrelloIcon
      },
      {
        title: 'Mail',
        href: '/app/mail',
        icon: MailIcon,
        info: () => (
          <Chip
            color="secondary"
            size="small"
            label="Updated"
          />
        )
      },
      {
        title: 'Chat',
        href: '/app/chat',
        icon: MessageCircleIcon,
        info: () => (
          <Chip
            color="secondary"
            size="small"
            label="Updated"
          />
        )
      },
      {
        title: 'Calendar',
        href: '/app/calendar',
        icon: CalendarIcon
      },
    ]
  }, */
 /*  {
    subheader: 'Auth',
    items: [
      {
        title: 'Login',
        href: '/login-unprotected',
        icon: LockIcon
      },
      {
        title: 'Register',
        href: '/register-unprotected',
        icon: UserPlusIcon
      },
      {
        title: 'Login: Guest Protected',
        href: '/login',
        icon: ShieldIcon
      },
      {
        title: 'Register: Guest Protected',
        href: '/register',
        icon: ShieldIcon
      }
    ]
  }, */
  // {
  //   subheader: 'Pages',
  //   href: '/app/pages',
  //   items: [
  //     {
  //       title: 'Account',
  //       href: '/app/account',
  //       icon: UserIcon
  //     },
  //    /*  {
  //       title: 'Error',
  //       href: '/404',
  //       icon: AlertCircleIcon
  //     }, */
  //     /* {
  //       title: 'Pricing',
  //       href: '/pricing',
  //       icon: DollarSignIcon
  //     } */
  //   ]
  // },
  /* {
    subheader: 'Extra',
    items: [
      {
        title: 'Charts',
        href: '/app/extra/charts',
        icon: BarChartIcon,
        items: [
          {
            title: 'Apex Charts',
            href: '/app/extra/charts/apex'
          }
        ]
      },
      {
        title: 'Forms',
        href: '/app/extra/forms',
        icon: EditIcon,
        items: [
          {
            title: 'Formik',
            href: '/app/extra/forms/formik'
          },
          {
            title: 'Redux Forms',
            href: '/app/extra/forms/redux'
          },
        ]
      },
      {
        title: 'Editors',
        href: '/app/extra/editors',
        icon: LayoutIcon,
        items: [
          {
            title: 'DraftJS Editor',
            href: '/app/extra/editors/draft-js'
          },
          {
            title: 'Quill Editor',
            href: '/app/extra/editors/quill'
          }
        ]
      }
    ]
  } */
];

/*if(userName === 'jay.net.in@gmail.com'){
  navConfig.push({
    subheader: 'Admin',
    items: [
      {
        title: 'Language',
        icon: UsersIcon,
        href: '/app/admin/language',
      },
      {
        title: 'Github Issue Tracker',
        icon: UsersIcon,
        href: '/app/admin/github',
      },
      {
        title: 'NVD',
        icon: UsersIcon,
        href: '/app/admin/nvd',
      },
      {
        title: 'Application',
        icon: UsersIcon,
        href: '/app/admin/application',
      },
    ]
  });
}*/

function renderNavItems({ items,alertsResponse, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, alertsResponse,...rest }),
        []
      )}    
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0,
  alertsResponse
}) {
  const key = item.title + depth;

   

  if(item.title == 'Alerts'){
      if(alertsResponse && alertsResponse.length > 0) {
        item.info = () => (
            <Avatar className="menu-right-info">{alertsResponse ? (alertsResponse.length > 10 ? '10+': alertsResponse.length) : 0}</Avatar>
            
          )

          {/*item.info = () => (
            <Chip
              color="primary"
              className="menu-right-info"
              size="small"
              label={alertsResponse ? alertsResponse.length : 0}
            />
          )*/}
      }  
        
  }

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
       
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    ...(theme.name === THEMES.NEWLIGHT
    ? {
        backgroundColor: theme.palette.background.main,
      }
    : {}),
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    borderRight: 0,
    height: 'calc(100% - 64px)',
    ...(theme.name === THEMES.NEWLIGHT
      ? {
          backgroundColor: theme.palette.background.main,
        }
      : {}),
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

function NavBar({ openMobile, onMobileClose, }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector((state) => state.account);

  const [alertsResponse, setAlertsResponse] = useState(null);

  useEffect(() => {
    getAlerts();
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    
  }, [location.pathname]);

  const getAlerts = async () => {
    try {
      const url = `/corner/getalert`;
      const response = await Axios.get(url);
      setAlertsResponse(response.data);      
    } catch (error) {
      console.error(error);
    }
  };
  

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/">
              <Logo className="dashboard-logo"/>
            </RouterLink>
          </Box>
        </Hidden>
        {/* <Box p={2}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={user.avatar}
              />
            </RouterLink>
          </Box>
          <Box
            mt={2}
            textAlign="center"
          >
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {/* {`${user.firstName} ${user.lastName}`} */}
              {/* {`${user}`}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {user.bio}
            </Typography>
          </Box>
        </Box>
        <Divider /> */} 
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {config.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname,alertsResponse })}
            </List>
          ))}
        </Box>
        <Divider />
       {/*  <Box p={2}>
          <Box
            p={2}
            borderRadius="borderRadius"
            bgcolor="background.dark"
          >
            <Typography
              variant="h6"
              color="textPrimary"
            >
              Need Help?
            </Typography>
            <Link
              variant="subtitle1"
              color="secondary"
              component={RouterLink}
              to="/docs"
            >
              Check our docs
            </Link>
          </Box>
        </Box> */}
      </PerfectScrollbar>
    </Box>
  );

  const [open, setOpen] = React.useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
        {/*   <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />  
          </IconButton>
        </div> */}
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
         {/*  <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon /> 
          </IconButton>
        </div> */}
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
