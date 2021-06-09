import { Box, Card, CardHeader, ListItem, ListItemText, makeStyles, TextField, Typography,Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,Divider } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import { useHistory } from 'react-router';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Copy from "../../../../Util/Copy";
import './index.css';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {},
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  },
  link : {
    cursor : 'pointer'
  }
}));



function getRandomInt(min, max) {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RealTime({ className, lib_details,headtitle, selData,...rest }) {


  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();

  let originalLibDetails = useRef(lib_details);

  const [searchedLibDetails, setSearchedLibDetails] = useState(Copy(lib_details));
  const [searchInput, setSearchInput] = useState();

  const [openSearch, setOpenSearch] = useState(false);

  const handleSearchOpen = () => {
    setOpenSearch(true);
  };

  const handleSearchClose = () => {
    setOpenSearch(false);
  };

  useEffect(()=>{
    originalLibDetails = lib_details;
    setSearchedLibDetails(lib_details);

  },[lib_details]);


  const pages = [
    {
      pathname: '/app/projects',
      views: '24'
    },
    {
      pathname: '/app/chat',
      views: '21'
    },
    {
      pathname: '/cart',
      views: '15'
    },
    {
      pathname: '/cart/checkout',
      views: '8'
    }
  ];

  const height = 375;
  const rowHeight = 52;
  const width = 398;
  

  const rowRenderer = ({ index, isScrolling, key, style }) => {
    return searchedLibDetails && (
        <TableRow className="odd-even-background">
          <TableCell style={{width: '50%'}}><Typography color="inherit"
            className="secondary"
          >
             <Link className = {classes.link} onClick={()=>onProductClick(searchedLibDetails[index],selData)} >{searchedLibDetails[index].name}</Link>
          </Typography></TableCell>
          <TableCell style={{width: '10%'}}><Typography color="inherit"
            className="secondary"
          >
            {searchedLibDetails[index].value}
          </Typography></TableCell>
        </TableRow>
    )
      ;
  };

  const handleChangeSearch = (event) => {
    const filteredResult = originalLibDetails.current.filter(details => details.name.toLowerCase().includes(event.target.value));
    setSearchedLibDetails(filteredResult);
    setSearchInput(event.target.value);
  }

  const onProductClick = (product,selData) => {
   /* history.push( '/app/dashboard/productDetailVul',
                  product,selData);*/
      history.push({pathname:"/app/dashboard/productDetailVul",state: {name: product.name, selData: selData}}) ;           
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      
    { openSearch ? null : <CardHeader
        title={headtitle}
        action={
          <IconButton aria-label="settings">
            <SearchIcon onClick={handleSearchOpen} />
          </IconButton>
        }
      /> }
      { openSearch ? <TextField
        required
        value={searchInput}
        onChange={handleChangeSearch}
        className="secondary"
        labelClassName="secondary"
        style={{
          marginLeft: '15px',
        }}
        id="search"
        placeholder="Search"
      /> : null }
      { openSearch ? <IconButton aria-label="settings">
            <CloseIcon onClick={handleSearchClose} />
          </IconButton> : null }
      
      <Divider />
      <Table>
        <TableBody>
      {searchedLibDetails && (
        <VirtualizedList
          rowCount={searchedLibDetails.length}
          width={width}
          height={height}
          rowHeight={rowHeight}
          rowRenderer={rowRenderer}
          overscanRowCount={3}
        />
      )}
       </TableBody>
      </Table>
    </Card>
  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
