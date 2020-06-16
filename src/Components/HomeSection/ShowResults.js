import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 200,
    height: 300,
    marginLeft: 7,
    marginRight: 7,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export default function SimpleGrow() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show Solution"
      />
      <div className={classes.container}>
        <Grow in={checked}>
          <Paper elevation={4} className={classes.paper}>
            <div className={classes.svg}>
                <Typography component={'span'} variant="subtitle2"
                    gutterBottom testid='typographyHeaderId'>
                    Pairwise Alignment
                    <br />
                    <Divider />
                </Typography>

                <Typography variant="caption" display="block" gutterBottom>
                1. Compares 2 sequences - either protien, DNA or RNA
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                2. Optimal alignment can be obtained with O(n^2)
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                3. Comparatively simple
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                4. Categorized as local and gloable alignment
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                5. Used to find out conserved regions between 2 sequences
                </Typography>

            </div>
          </Paper>
        </Grow>

    {/* Conditionally applies the timeout prop to change the entry speed. */}
        <Grow
          in={checked}
          style={{transformOrigin: '0 0 0'}}
          {...(checked ? {timeout: 1000} : {})}
        >
          <Paper elevation={4} className={classes.paper}>
            <div className={classes.svg}>
                    <Typography component={'span'} variant="subtitle2"
                        gutterBottom testid='typographyHeaderId'>
                        MSA Alignment
                        <br />
                        <Divider />
                    </Typography>

                    <Typography variant="caption" display="block" gutterBottom>
                    1. Compare more than 2 sequeneces
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                    2. Genarally uses gloabl alignment
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                    3. Finding optimal alignment is exhustive.
                    Scales exponentially with more sequences
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                    4. Iterative and progressive methods are used
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                    5. Used to detect reggions of variability or
                    conservation in family of ganes
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                    6. Used with phylogenetic tree analysis
                    </Typography>


            </div>
          </Paper>
        </Grow>
      </div>
    </div>
  );
}
