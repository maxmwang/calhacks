import React from 'react';
import callOCRAPI from '../api/recognize';

function Title() {
  return (
    <section className="title">
      <h1>split</h1>
      <button type="submit" onClick={async () => { await console.log(await callOCRAPI()); }}>a</button>
    </section>

  );
}

export default Title;
