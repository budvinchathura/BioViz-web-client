import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import HomeIcon from '@material-ui/icons/Home';

import {ReactComponent as Logo} from '../../assets/icons/dna.svg';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {useDispatch, useSelector} from 'react-redux';
import {setMode, setTheme} from '../../Redux/Actions/Mode';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    navItem: {
        paddingTop: 0,
        paddingBottom: 0,
        margin: 'auto',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 30,
        width: 270,
    },
    navItemSelected: {

        borderStyle: 'solid',
        backgroundColor: '#00000020',

    },
}));

/**
 * Component to display navigation manus in drawer.
 * @param {Object} props
 * @return {React.ReactElement}
 */
export function DrawerList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentMode = useSelector((state) => state.mode);
    const currentTheme = useSelector((state) => state.currentTheme);
    let themeSelectorValue;
    if (currentTheme === 'dark') {
        themeSelectorValue = true;
    }

    const onThemeChange = (event) => {
        if (event.target.checked === true) {
            dispatch(setTheme('dark'));
        } else {
            dispatch(setTheme('light'));
        }
    };

    const dnaLogo = <Logo fill='#fff' stroke='#000'
        stroke-width="5%" width='25px' height='25px' />;

    // array with menu name, description and icon
    const navItems =
        [['Home',
            'Homepage with instructions',
            <HomeIcon key='0' />],
        ['PairAlign',
            'Align a pair of sequences',
            <Icon key='1'>{dnaLogo}</Icon>],
        ['MSA',
            'Align multiple sequences',
            <span key='2'> <Icon>{dnaLogo}</Icon>
                <Icon>{dnaLogo}</Icon></span>],
        ['Alignment Game',
            'Test your skill on detecting alignments',
            <SportsEsportsIcon key='3' />]];

    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem
                        // currently selected nav manu has a different styling
                        className={`${classes.navItem} ${index === currentMode ?
                            classes.navItemSelected : null}`}
                        button key={item[0]} onClick={() => {
                            dispatch(setMode(index));
                            props.closeDrawer();
                        }}>
                        <ListItemIcon>{item[2]}</ListItemIcon>
                        <ListItemText
                            primary={item[0]}
                            primaryTypographyProps={{variant: 'h6'}}
                            secondary={item[1]} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <div style={{textAlign: 'center', marginTop: 3}}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={themeSelectorValue}
                            onChange={onThemeChange}
                            name="themeValue"
                            color="primary"
                        />
                    }
                    label="Dark Mode"
                />
            </div>
        </div>
    );
}

DrawerList.propTypes = {
    closeDrawer: PropTypes.func,
};
