import React from 'react';
import CameraComponent from '../../components/Camera';

type Props = {
  image: string;
  setImage: (i: string) => void;
};
function Receipt({ image, setImage }: Props) {
  return (
    <section>
      <h1>Receipt</h1>
      <CameraComponent image={image} setImage={setImage} />
    </section>
  );
}

export default Receipt;
