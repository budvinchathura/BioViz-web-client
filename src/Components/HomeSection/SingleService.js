import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// import css modules
import style from './assets/css/image.module.css';

// import HomeSections component
import ViewMore from './ViewMore';

import {useDispatch} from 'react-redux';
import {setDrawerOpen} from '../../Redux/Actions/Mode';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        // height: 425,
        width: 300,
        margin: 25,
    },
    control: {
        padding: theme.spacing(2),
    },
    DivDecoration: {
        marginTop: 0,
        paddingTop: 25,
    },
    image: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block center',
        width: '75%',
        borderRadius: 20,
      },

}));

/**
 * Component to visualize single service
 * @param {String} title - title of the single service
 * @param {String} description - details of the single service
 * @param {node} image - the image of single service
 * @return {React.ReactElement}
 */

export default function SingleService({title, description, image}) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const onMove = () =>{
        dispatch(setDrawerOpen(true));
    };


    return (
        <div>

            <Grid item>
                <Paper className={classes.paper} >

                    <div className={classes.DivDecoration}>
                        <img
                            onClick={onMove}
                            className={style.image}
                            src={image}
                            alt=''
                        />
                        <Tooltip title={'Click here to visit '+title} >
                        <h3
                            onClick={onMove}
                            className={style.title}
                            >{title}
                        </h3>
                        </Tooltip>
                        <ViewMore
                            testid='viewMoreId'
                            title={'More details..'}
                            description={description} />
                    </div>
                </Paper>
            </Grid>


        </div>
    );
}

SingleService.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.node,
};
