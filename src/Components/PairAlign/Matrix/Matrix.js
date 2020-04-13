import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import {FixedSizeGrid} from 'react-window';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    cell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    inpath: {
        backgroundColor: 'red',
    },
}));


export default function Matrix(props) {
    const classes = useStyles();
    const gridRef = React.createRef();

    const inputLenA = props.input.seqA.length;
    const inputLenB = props.input.seqB.length;
    const scoreMatrix = props.result.score_matrix;
    const path = props.result.alignments[props.selected].path;
    const pathSet = new Set();
    path.forEach((p) => {
        pathSet.add(`${p[0]}${p[1]}${p[0] * p[1]}`);
    });

    const scrollToPath = () => {
        gridRef.current.scrollToItem({
          align: 'start',
          columnIndex: path[path.length-1][1]-1,
          rowIndex: path[path.length-1][0]-1,
        });
      };
    useEffect(() => {
        scrollToPath();
    });

    const makeCell = ({columnIndex, rowIndex, style}) => {
        const cIdx = columnIndex;
        const rIdx = rowIndex;
        let cell;
        let inPath;
        if (cIdx === 0) {
            if (rIdx === 0) {
                cell = '...';
            } else {
                cell = <b>G</b>;
            }
        } else if (rIdx === 0) {
            cell = <b>A</b>;
        } else {
            cell = <Cell value={scoreMatrix[rIdx - 1][cIdx - 1]} />;
            inPath = pathSet.has(
                `${rIdx - 1}${cIdx - 1}${(rIdx - 1) * (cIdx - 1)}`,
            );
        }

        return (
            <div style={style}
                className={`${classes.cell} ${inPath ? classes.inpath : ''}`}>
                {cell}
            </div>
        );
    };

    makeCell.propTypes = {
        columnIndex: PropTypes.number.isRequired,
        rowIndex: PropTypes.number.isRequired,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    return (
        <FixedSizeGrid
            className="Grid"
            columnCount={inputLenB+2}
            columnWidth={30}
            height={300}
            rowCount={inputLenA+2}
            rowHeight={35}
            width={300}
            ref={gridRef}
            // initialScrollLeft={30*(path[path.length-1][1]-1)}
            // initialScrollTop={30*(path[path.length-1][0]-1)}
        >
            {makeCell}
        </FixedSizeGrid>

    );
}

Matrix.propTypes = {
    input: PropTypes.shape({
        seqA: PropTypes.string,
        seqB: PropTypes.string,
    }),
    result: PropTypes.shape({
        score_matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        alignments: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.arrayOf(
                    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
            })),
    }),
    selected: PropTypes.number,
};
