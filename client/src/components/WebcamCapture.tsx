import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

function WebcamCapture() {
  const [imageSrc, setImageSrc] = useState('');
  const webcamRef = useRef<Webcam & HTMLVideoElement>(null);
  const capture = useCallback(() => {
    if (webcamRef.current) {
      setImageSrc(webcamRef.current.getScreenshot() || '');
    }
  }, [webcamRef]);

  const constraints = {
    facingMode: { exact: 'environment' },
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={constraints}
      />
      <button type="button" onClick={capture}>Capture photo</button>
      <img src={imageSrc} alt="screenshot" />
    </>
  );
}

export default WebcamCapture;
