import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

// import HomeSections component
import MSACoreDetails from './MSACoreDetails';

const ExpansionPanel = withStyles({
  root: {
    'border': '1px solid rgba(0, 0, 0, .125)',
    'boxShadow': 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    'backgroundColor': 'rgba(0, 0, 0, .03)',
    'borderBottom': '1px solid rgba(0, 0, 0, .125)',
    'marginBottom': -1,
    'minHeight': 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

/**
 *Component to show the details of MSA to expansion panel
 * @return {React.ReactElement}
 */

export default function PairwiseDetails() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    /* istanbul ignore next */
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel
        testid='expansionPanelId'
        square expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        >
        <ExpansionPanelSummary testid='expansionPanelSummaryId'
            aria-controls="panel1d-content" id="panel1d-header"
        >
            <Typography component={'span'} testid='typographyId1'>
                Want to know about MSA alignment? Click here
            </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails testid='expansionPanelDetailsId'>
          <Typography component={'span'} testid='typographyId2'>
            {/* Details of MSA in MSACoreDetails component*/}
            <MSACoreDetails />

          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </div>
  );
}
