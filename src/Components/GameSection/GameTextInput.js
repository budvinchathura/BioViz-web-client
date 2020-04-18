import React from 'react'
import GameFileUpload from './GameFileUpload';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from 'react-redux';


export default function GameTextInput(props) {

    const dispatch = useDispatch();    
    const [errorMsg , setErrorMsg] = React.useState(false)

    function inputSeq(event){
        dispatch(props.inputAction(event.target.value.trim()));
    }

    return (
        <div>
             <TextField
                multiline
                rowsMax={4}
                placeholder='DNA Sequence'
                style={{width: '100%'}}
                value={props.value}
                onChange={inputSeq} >
            </TextField>
            {errorMsg? <span>Invalid input</span>:''}
        </div>
    )
}
