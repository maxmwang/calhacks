import React from 'react';
import '../styles/components/joinparty.css';
import {useAppDispatch} from '../redux/hooks';
import {appViewSet} from '../redux/constants/actionCreators/socketActions';


function handleClick(i: any) {
    console.log(i)
    console.log(i.target)
    console.log(i.target)
    i.target.className = "clicked"
}
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

function JoinParty() {
    const dispatch = useAppDispatch()

    return (
        <div onClick={(i)=>{
            handleClick(i);
            (async () => { 
                // Do something before delay
                console.log('before delay')
        
                await delay(1000);
        
                // Do something after
                console.log('after delay')
                dispatch(appViewSet("joinparty"));
            })();
            
        }}>
        <div id="joinpartybutton">Join Party</div>
        </div>
    );
}

export default JoinParty;
