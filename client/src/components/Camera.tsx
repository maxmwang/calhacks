import React, { useRef } from 'react';
import { Camera, CameraType } from 'react-camera-pro';

type Props = {
  image: string;
  setImage: (i: string) => void;
};
function CameraComponent({ image, setImage }: Props) {
  const camera = useRef<CameraType | null>(null);

  const takeImage = () => {
    const imageNow = camera.current!.takePhoto();
    console.log(imageNow);
    setImage(imageNow);
  };

  return (
    <div>
      <button type="button" onClick={takeImage}>Take photo</button>
      <div className="camera-component">
        {!image ? (
          <Camera
            ref={camera}
            facingMode="environment"
          />
        ) : null}
      </div>
      <img src={image} alt="Taken" />
    </div>
  );
}

export default CameraComponent;
