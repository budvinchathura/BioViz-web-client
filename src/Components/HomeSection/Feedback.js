import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


// import css modules
import style from './assets/css/image.module.css';

// import HomeSections component
import Alert from './Alert';
import Rating from './Rating';
import TextArea from './TextArea';
import {submitFeedback} from '../../Feedback/feedback';


const useStyles = makeStyles((theme) => ({
    table: {
        // minWidth: 650,
    },
    root: {
        paddingLeft: '20%',
        paddingRight: '20%',
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: 50,
        paddingBottom: 50,
    },
    position: {
        marginTop: '20px',
        marginLeft: '85%',
    },
}));


const details = {
    title: 'Thank you!',
    description: 'This helps us to improve our website better in the future.',
};

/**
 *Component to get feedback
 * @return {React.ReactElement}
 */

export default function Feedback() {
    const classes = useStyles();

    const [ratingValues, setratingValues] = useState([5, 5, 5, 5]);
    const [generalComment, setgeneralComment] = useState('');

    const setSingleRatingValue = (index) => {
        return (event, newValue) => {
            const newValues = [...ratingValues];
            newValues[index] = newValue;
            setratingValues(newValues);
        };
    };

    const onChangeCommentValue = (e) => {
        setgeneralComment(e.target.value);
        console.log(generalComment);
    };

    const onSubmitFeedback = () => {
        submitFeedback(ratingValues, generalComment);
    };


    function createData(name, rate) {
        return {name, rate};
    }

    const rows = [
        createData('Attraction of website',
            <Rating
                currentValue={ratingValues[0]}
                onChange={setSingleRatingValue(0)} />),
        createData('satisfaction of the functionalities',
            <Rating
                currentValue={ratingValues[1]}
                onChange={setSingleRatingValue(1)} />),
        createData('satisfaction of visualizing the result',
            <Rating
                currentValue={ratingValues[2]}
                onChange={setSingleRatingValue(2)} />),
        createData('satisfaction of the response time',
            <Rating
                currentValue={ratingValues[3]}
                onChange={setSingleRatingValue(3)} />),
        createData('Any other general comment',
            <TextArea
                currentValue={generalComment}
                onChange={onChangeCommentValue} />),
    ];

    return (
        <div className={classes.root}>
            <h2 className={style.heading}>Leave a feedback</h2>
            <p className={style.subHeading}>
                We are happy to have your valuable  feedback to
                improve our website better.
        </p>

            <TableContainer testid='tableContainerId' component={Paper}>
                <Table
                    testid='tableId'
                    className={classes.table}
                    aria-label="caption table">
                    <caption>We are happy to get your feedback.</caption>
                    <TableHead testid='tableHeadId'>
                        <TableRow testid='tableRowId'>
                            <TableCell testid='tableCellId1'>
                                Facilities
                                </TableCell>
                            <TableCell testid='tableCellId2' align="right">
                                Ratings
                                </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody testid='tableBodyId'>
                        {rows.map((row) => (
                            <TableRow testid='tableRowId2' key={row.name}>
                                <TableCell testid='tableCellId3'
                                    component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    testid='tableCellId4'
                                    align="right">
                                    {row.rate}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classes.position} >
                <Alert {...details} submitFeedback={onSubmitFeedback} />
            </div>

        </div>
    );
}
