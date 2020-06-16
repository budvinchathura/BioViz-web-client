import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// import HomeSections component
import Snackbar from './Snackbar';
import Alert from './Alert';
import ShowResults from './ShowResults';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 500,
    height: 330,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));


function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

// function union(a, b) {
//   return [...a, ...not(b, a)];
// }

/**
 *Component is to move the items of game
 * @return {React.ReactElement}
 */
export default function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  // const [answer, setAnswer] = React.useState(false);
  const [Alertcomponent, setAlertcomponent] = React.useState(null);

  // update the sentences
  const [left, setLeft] = React.useState(
      ['Compares 2 sequences - either protien, DNA or RNA',
      'Optimal alignment can be obtained with O(n^2)',
      'Comparatively simple',
      'Used with phylogenetic tree analysis',
      'Used to find out conserved regions between 2 sequences',
      'Genarally uses gloabl alignment',
    ]);

  const [right, setRight] = React.useState(
      ['Categorized as local and gloable alignment',
      'Compare more than 2 sequeneces',
      `Finding optimal alignment is exhustive. 
      Scales exponentially with more sequences`,
      'Iterative and progressive methods are used',
      `Used to detect reggions of variability or
       conservation in family of ganes`,
    ]);

    const pairwise =
        ['Compares 2 sequences - either protien, DNA or RNA',
        'Optimal alignment can be obtained with O(n^2)',
        'Comparatively simple',
        'Categorized as local and gloable alignment',
        'Used to find out conserved regions between 2 sequences',
        ];

    const msa =
        ['Compare more than 2 sequeneces',
        'Genarally uses gloabl alignment',
        `Finding optimal alignment is exhustive. 
        Scales exponentially with more sequences`,
        'Iterative and progressive methods are used',
        `Used to detect reggions of variability or 
        conservation in family of ganes`,
        'Used with phylogenetic tree analysis',
        ];


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  /*
    This function is to mark an unmark items
  */
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  // const handleToggleAll = (items) => () => {
  //   if (numberOfChecked(items) === items.length) {
  //     setChecked(not(checked, items));
  //   } else {
  //     setChecked(union(checked, items));
  //   }
  // };

  /*
    This function is to change left side selected item move to right
  */
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

    /*
    This function is to change right side selected item move to left
  */

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };


  const customList = (title, items) => (
    <Card testid='cardId'>
      <CardHeader testid='cardHeaderId'
        className={classes.cardHeader}
        // avatar={
        //   <Checkbox
        //     testid='checkBoxId'
        //     onClick={handleToggleAll(items)}
        //     checked=
        //     {numberOfChecked(items) === items.length && items.length !== 0}
        //     indeterminate=
        //     {numberOfChecked(items) !== items.length &&
        //         numberOfChecked(items) !== 0}
        //     disabled={items.length === 0}
        //     inputProps={{'aria-label': 'all items selected'}}
        //   />
        // }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider testid='dividerId' />
      <List className={classes.list} dense component="div" role="list"
        testid='listId' >
        {items.map((value) => {
          // const val = valu.split(':');
          // const value=val[0];
          // const alignment = val[1];
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
                testid='listItemId'
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
            >
              <ListItemIcon testid='listItemIconId'>
                <Checkbox testid='checkBox2Id'
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{'aria-labelledby': labelId}}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={` ${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const instruction = {
    message: 'Select and move the rows into relavant alignment.',
  };

  const rightAnswerAlert = {
    viewResult: true,
    title: 'Congrats!',
    description: 'Your anser is right.',
  };

  const wrongAnswerAlert = {
    viewResult: true,
    title: 'Try again!',
    description: 'Your anser is wrong.',
  };

  const checkResult = () => {
    if (left.length === pairwise.length && right.length === msa.length) {
      const one = 'Compares 2 sequences - either protien, DNA or RNA';
      let a = 0;
      const two = 'Optimal alignment can be obtained with O(n^2)'; let b = 0;
      const three = 'Comparatively simple'; let c = 0;
      const four ='Categorized as local and gloable alignment'; let d = 0;
      const five='Used to find out conserved regions between 2 sequences';
      let e = 0;

      // eslint-disable-next-line
      left.map((item) => {
        if (item === one ) {
          console.log('a');
          a = 1;
        } else if (item === two) {
          console.log('b');
          b = 1;
        } else if (item === three) {
          console.log('c');
          c = 1;
        } else if (item === four) {
          console.log('d');
          d = 1;
        } else if (item === five) {
          console.log('e');
          e = 1;
        }
      });

      if (a===b && a && c===d && a===e) {
        return (
        setAlertcomponent(

        <Alert onClick = {checkResult} {...rightAnswerAlert} />,
        )
      );
      } else {
        return (
          setAlertcomponent(
          <Alert onClick = {checkResult} {...wrongAnswerAlert} />,
          )
        );
      }
    } else {
      return (
        setAlertcomponent(
        <Alert onClick = {checkResult} {...wrongAnswerAlert} />,
        )
      );
    }
  };

  return (
    <div className={classes.root}>
      <Grid container testid='gridId'
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.root}
      >
        <Grid item testid='gridItemId1'>
          {customList('Pairwise Alignment', left)}</Grid>
        <Grid item testid='gridItemId2'>
          <Grid container direction="column" alignItems="center"
            testid='gridContainerId'>
            <Button testid='buttonId1'
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>

            <Button testid='buttonId2'
              onClick = {checkResult}
              >{
                Alertcomponent?
                  'Re-submit':
                    'Submit'}
                </Button>

              {Alertcomponent}

            <Button testid='buttonId3'
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Snackbar {...instruction} testid='snackbarId' />
        <Grid item testid='gridItemId3'>
          {customList('MSA Alignment', right)}</Grid>
          <ShowResults />
      </Grid>

    </div>
  );
}
