import {
  Container, ExpansionPanel,
  ExpansionPanelDetails, ExpansionPanelSummary, Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,

  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { cloneDeep } from 'lodash';
import MaterialTable from 'material-table';
import React from 'react';
import CWEPieChart from "../../ProductsReports/ReportSummary/CWEPieChart/CWEPieChart";
import SeverityBarChart from "../../ProductsReports/ReportSummary/SeverityBarChart/SeverityBarChart";
import { getBackgroundColorBySeverity, getFontColorBySeverity } from './../../../Util/Util';
import './TabsData.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'inherit', // theme.palette.background.paper,
    paddingLeft: '16px !important',
    paddingRight: '8px !important',
  }
}));

const TabsData = ({ reportType, tabsData, expandPanel, bgcolor }) => {

  const classes = useStyles();


  const getTable = (tabData) => {
    if (!tabData.tableData) return;
    const columns = cloneDeep(tabData.tableData.columns);
    const severityColumn = columns.find(column => column.field === 'severity');
    severityColumn.render = rowData => {
      const rowDataSeverity = rowData.severity?.toLowerCase();
      const backgroundColor = getBackgroundColorBySeverity(rowDataSeverity);
      const color = getFontColorBySeverity(rowDataSeverity);
      return (
        <div
          style={{
            backgroundColor: backgroundColor,
            color: color,
          }}
          className="severity-div"
        >
          {rowData.severity}
        </div>
      )
    };

    return (
      <MaterialTable
        title={null}
        columns={columns}
        data={tabData.tableData.data}
        style={{ width: '100%' }}
        options={{
          cellStyle: {
            fontSize: 13,
            fontFamily: '"Montserrat",sans-serif !important',
          },
          headerStyle: {
            fontSize: 16,
            fontFamily: '"Montserrat",sans-serif !important',
            color: '#546e7a',
          },
          rowStyle: x => {
            if (x.tableData.id % 2 === 0) {
              return { backgroundColor: "#e7e7ef" }
            }
          }
        }}
      />
    );
  };

  // const getHeader = (headers) => {
  //   return (
  //     <div className="flex">
  //       {
  //         headers.map(header => {
  //           return (
  //             <Paper style={{ padding: '10px' }}>
  //               <div>
  //                 <h6 className="details-header">
  //                   {Object.keys(header)[0]}
  //                 </h6>
  //               </div>
  //               {header[Object.keys(header)[0]]}
  //             </Paper>
  //           )
  //         })
  //       }
  //     </div>
  //   )

  // }

  const getCharts = (tabData, appName) => {
    const width = 200;
    const height = 200;
    return (
      <div className="flex justifyAround">
        <div className="cve-pie-chart">
          <div className="cve-pie-chart-right">
            {
              tabData.header && <CWEPieChart
                cwe={tabData.header}
                divId={`${appName}-header-pieChart`}
                bgColor="#26c6da"
                width={width}
                height={height}
                title=""
              />
            }
          </div>
          <div className="cve-pie-chart-title">
            CVE vs Non-CVE
          </div>
        </div>
        <div className="cve-pie-chart" style={{ width: '254px' }}>
          <div className="cve-pie-chart-right">
            {tabData.severity ? <SeverityBarChart
              severity={tabData.severity}
              divId={`${appName}-barChart`}
              bgColor="#ffa726"
              title=''
              width={250}
              height={height}
              displayModeBar={false}
            /> : ''}
          </div>
          <div className="cve-pie-chart-title">
            Severity
          </div>
        </div>

        <div className="cve-pie-chart">
          <div className="cve-pie-chart-right">
            {tabData.CWE ? <CWEPieChart
              cwe={tabData.CWE}
              divId={`${appName}-pieChart`}
              bgColor="#ef5350"
              width={width}
              height={height}
              title=''
            /> : ''}
          </div>
          <div className="cve-pie-chart-title">
            CWE
          </div>
        </div>


      </div>
    )
  }

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid style={{ width: '100%' }} container spacing={1}>
        <List style={{ width: '100%' }} dense={false}>
          {tabsData.map((tabData) => {
            return (
              <ExpansionPanel
                key={tabData.appName}
                style={{ width: '100%', marginBottom: '16px' }}
                onChange={(event, expanded) =>
                  expandPanel(event, expanded, tabData, reportType)}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <ListItem key={tabData.appName} style={{ display: 'block' }}>
                    <div>


                      <div className="language-icon">
                        <Typography
                          className=" background-shadow background-margin"
                          style={{ background: `${bgcolor}` }}>
                          {tabData.appName}</Typography>
                        <div className=" background-shadow background-margin count"
                          style={{ background: `${bgcolor}` }}>
                          {
                            Object.keys(tabData.count).map((cKey, index) => <div style={{ marginLeft: index === 1 ? '12px' : '0' }} > {cKey}   {tabData.count[cKey]}   </div>)
                          }
                        </div>
                      </div>
                      <div className="sub-title">
                        <ListItemText
                          primary={<ListItemIcon >
                            <img
                              className="languageImg"
                              src={`${process.env.PUBLIC_URL}/static/images1/${tabData.imageName}`}
                              alt="t"
                            />
                          </ListItemIcon>}
                          secondary={tabData.description}
                        />
                      </div>
                    </div>
                  </ListItem>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div style={{ width: '100%' }}>
                    {/* {tabData.tableData?.header ? getHeader(tabData.tableData?.header) : null} */}
                    {tabData.tableData ? getCharts(tabData.tableData, tabData.appName) : null}
                    {tabData.tableData
                      ? getTable(tabData)
                      : 'Loading Data...'}
                  </div>

                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </List>
      </Grid>
    </Container>
  );
};

export default TabsData;
