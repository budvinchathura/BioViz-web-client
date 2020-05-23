/* eslint-disable max-len */
import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  margin: {
    height: theme.spacing(3),
  },
}));

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
  {
    value: 0,
  },
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
  {
    value: 100,
  },
];

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    'height': 28,
    'width': 28,
    'backgroundColor': '#fff',
    'boxShadow': iOSBoxShadow,
    'marginTop': -14,
    'marginLeft': -14,
    '&:focus, &:hover, &$active': {
      'boxShadow': '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    'left': 'calc(-50% + 12px)',
    'top': -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);


export default function CustomizedSlider() {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <IOSSlider
        testid='IOSSliderId'
        aria-label="ios slider" defaultValue={75} marks={marks} valueLabelDisplay="on" />
    </div>
  );
}
