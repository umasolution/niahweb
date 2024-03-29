import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import './PackageJSON.css';
import { getFontColorBySeverity, getBackgroundColorBySeverity } from './../../../../Util/Util';

const useStyles = makeStyles((theme) => ({
    // borderDiv: {
    //     // border: '1px',
    //     // borderStyle: 'solid',
    //     // borderRadius: '10px',
    //     // borderColor: 'brown',
    //     marginTop: '5px',
    //     maxWidth: '1000px',
    //     overflow: 'auto',
    //     scrollBehavior: 'auto',
    //     textTransform: 'capitalize'
    // },
    title: {
        color: theme.palette.primary.light,
        display: 'inline',
        marginRight: '5px'
    },
    secondaryText: {
        color: "inherit",
        display: 'inline',
        marginRight: '5px'
    }
}));

const PackageJSON = ({ packageJSON }) => {

    const classes = useStyles();


    const printValues = (key, index, data) => {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header-custom"
                >

                    {Object.keys(key).map(moduleKey => {
                        return (
                            moduleKey !== 'Severity' ? (
                                <div key={moduleKey}>
                                    <Typography
                                      variant="h6"
                                      color="textPrimary"
                                      className={classes.title}
                                    >
                                        {moduleKey}
                                    </Typography>

                                    {' '}
                                    <Typography className={classes.secondaryText}>
                                        {key[moduleKey]}
                                    </Typography>
                                </div>
                            ) : null
                        )
                    })}
                    <div
                        style={{
                            backgroundColor: getBackgroundColorBySeverity(key.Severity),
                 color: getFontColorBySeverity(key.Severity),
                }}
                      className="severity-end severity-div"
                    >
                        <Typography className={classes.secondaryText}>
                            {key.Severity}
                        </Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ display: 'block', flexWrap: 'wrap' }}>
                    {Object.keys(data).map(moduleKey => {
                        return (

                            <div key={moduleKey} className="odd-even-background">
                                <Typography
                                  variant="h6"
                                  color="textPrimary"
                                  className={classes.title}
                                >
                                    {moduleKey}
                                </Typography>
                                <Typography className={classes.secondaryText}>
                                    {data[moduleKey]}
                                </Typography>
                                {' '}

                            </div>
                        )
                    })}
                </ExpansionPanelDetails>
            </ExpansionPanel>

        )

    }

    return (
        <div>
            {
                packageJSON.header.map((value, index) => {
                    return (

                        <div>
                            <Paper className={classes.borderDiv}>
                                {printValues(value, index, packageJSON.data[index])}
                            </Paper>
                        </div>
                    )
                }
                )
            }

        </div>
    );
};

export default PackageJSON;