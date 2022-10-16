/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import '../styles/components/joinparty.css';

function handleClick(i: any) {
  i.target.className = 'clicked';
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type Props = {
  onClick: () => void;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function JoinPartyButton({ onClick }: Props) {
  return (
    <div onClick={(i) => {
      handleClick(i);
      (async () => {
        await delay(1000);
        onClick();
      })();
    }}
    >
      <div id="joinpartybutton">Join Party</div>
      {' '}
    </div>
  );
}

export default JoinPartyButton;
