import React, { useRef } from 'react';
import { Camera, CameraType } from 'react-camera-pro';
import { selectItems } from '../redux/features/partySlice';
import { useAppSelector } from '../redux/hooks';
import TItem from '../types/item';

type Props = {
  image: string;
  setImage: (i: string) => void;
};
function CameraComponent({ image, setImage }: Props) {
  const dbItems = useAppSelector(selectItems) as TItem[];

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
        {!image && !dbItems ? (
          <Camera
            ref={camera}
            facingMode="environment"
          />
        ) : <h1>Photo already Taken!</h1>}
      </div>
      {image ? <img src={image} alt="Taken" /> : null}
    </div>
  );
}

export default CameraComponent;
