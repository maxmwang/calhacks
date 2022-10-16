import React from 'react';
import '../styles/components/joinparty.css';
import {useAppDispatch} from '../redux/hooks';
import {appViewSet} from '../redux/constants/actionCreators/socketActions';

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

function CreateParty() {
    const dispatch = useAppDispatch()

    return (
        <div>
        </div>
    );
}

export default CreateParty;
