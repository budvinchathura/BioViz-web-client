import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// import css modules
import style from './assets/css/image.module.css';

// import images
import analyzeImage from './assets/img/1.jpg';
import visualizeImage from './assets/img/2.jpg';
import gamePlayImage from './assets/img/3.png';

// import HomeSections component
import SingleService from './SingleService';

const services = [
  {
    title: 'Pairwise Alignment',
    description: `Input your two sequences to get alignment
      result with visualizing matrix.`,
    image: analyzeImage,
  },

  {
    title: 'MSA Alignment',
    description: `Enter your sequences to get 
        alignment result with visualizing phylogenetic tree.`,
    image: visualizeImage,
  },

  {
    title: 'Simple GamePlay',
    description: `This activity is for entertainment 
        and also get a basic knowledge about how alignments work.`,
    image: gamePlayImage,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
}));

/**
 * Component to visualize services of the website
 * @return {React.ReactElement}
 */

export default function Services() {
  const classes = useStyles();

  return (
    <div>
      <h2 className={style.heading}>Services</h2>
      <p className={style.subHeading}>
        These are the services provided by the website
      </p>

      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            {services.map((service, index) => {
              return <SingleService {...service} key={index} />;
            })}
          </Grid>

          <p>
            These services will help you to analyze and visualize the
            bioinformatic sequences with different ways of alignments and
            gather more knowledge about these areas.
            <br />
            This website provides userfriendly visualizations to easily
            understand the result.
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
