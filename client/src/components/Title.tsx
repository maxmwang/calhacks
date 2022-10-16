import React from 'react';
import callOCRAPI from '../api/recognize';
import {useAppDispatch} from '../redux/hooks';
import {appViewSet} from '../redux/constants/actionCreators/socketActions';


function Title() {
  const dispatch = useAppDispatch()
  return (
    <section className="title">
      <h1>split</h1>
      <button type="submit" onClick={async () => { await console.log(await callOCRAPI()); }}>a</button>
      <h1>ahhhh</h1>
      <button type="submit" onClick={()=>{dispatch(appViewSet("split"))}}>go to login</button>
    </section>

  );
}

export default Title;
