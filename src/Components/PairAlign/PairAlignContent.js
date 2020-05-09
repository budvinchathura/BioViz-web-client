import React from 'react';
import PairAlignInput from './PairAlignInput';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';
import {
    fetchNW, fetchSW,
    fetchNWExtended, fetchSWExtended,
} from '../../API/PairAlign';
import PairAlignResult from './PairAlignResult';
import LoadingOverlay from './LoadingOverlay';
import GenomeTypeInput from '../GeomeType/GenomeTypeInput';
import {Box} from '@material-ui/core';

export default function PairAlignContent() {
    const [result, setResult] = React.useState(false);
    const [loading, setloading] = React.useState(false);
    const genomeType = useSelector((state) => state.genomeType);
    const seqA = useSelector((state) => state.P1);
    const seqB = useSelector((state) => state.P2);
    const match = useSelector((state) => state.matchScore);
    const mismatch = useSelector((state) => state.mismatchPenalty);
    const gap = useSelector((state) => state.gapPenalty);
    const gapOpen = useSelector((state) => state.gapOpenPenalty);
    const gapExtend = useSelector((state) => state.gapExtendPenalty);
    const scoringMethod = useSelector((state) => state.scoringMethod);
    const tracebackPriority = useSelector((state) => state.tracebackPriority);
    const similarityMatrixName =
        useSelector((state) => state.similarityMatrixName);
    const DNASimilarityMatrix =
        useSelector((state) => state.DNASimilarityMatrix);
    const algo = useSelector((state) => state.pAlgo);

    const onReceive = (data) => {
        console.log(data);
        setloading(false);
        if (data) {
            setResult({
                result: data.result, input: {
                    seqA, seqB, match,
                    mismatch, gap, gapOpen, gapExtend, scoringMethod,
                },
            });
        }
    };

    const onSubmit = () => {
        setResult(undefined);
        setloading(true);
        if (algo === '1') {
            if (scoringMethod === 'BASIC') {
                fetchNW(seqA, seqB, match, mismatch, gap, onReceive);
            } else {
                fetchNWExtended(seqA, seqB, match, mismatch, gapOpen,
                    gapExtend, tracebackPriority, genomeType,
                    similarityMatrixName, DNASimilarityMatrix, onReceive);
            }
        } else {
            if (scoringMethod === 'BASIC') {
                fetchSW(seqA, seqB, match, mismatch, gap, onReceive);
            } else {
                fetchSWExtended(seqA, seqB, match, mismatch, gapOpen,
                    gapExtend, tracebackPriority, genomeType,
                    similarityMatrixName, DNASimilarityMatrix, onReceive);
            }
        }
    };

    return (
        <div>
            <h2>PairAlign Mode</h2>
            <Box boxShadow={3} padding={5}>
                <GenomeTypeInput />
            </Box>
            <PairAlignInput />
            <br />
            <Button
                variant="outlined"
                color="secondary"
                onClick={onSubmit}>
                Submit
            </Button>
            <br />
            {loading ? <LoadingOverlay /> : ''}

            <br />{result ?
                <div> <PairAlignResult
                    input={result.input}
                    result={result.result} />
                </div> :
                ''}

        </div>
    );
}
