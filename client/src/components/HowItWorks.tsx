import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

type HowItWorksComponentProps = {
  isOpen: boolean;
  onClose: () => void;
};
function HowItWorks({ isOpen, onClose }: HowItWorksComponentProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How billZ Works</ModalHeader>
        <ModalCloseButton />
        <ModalBody />
      </ModalContent>
    </Modal>
  );
}

export default HowItWorks;
