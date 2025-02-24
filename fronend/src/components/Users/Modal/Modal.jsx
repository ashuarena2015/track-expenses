import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalComponent = (props) => {

  const { displayModal, user } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(displayModal);
  }, [displayModal])


  if(!show) {
    return;
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{user.firstName} {user.maidenName} {user.lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Email: {user.email}</Modal.Body>
      </Modal>
    </>
  );
}

ModalComponent.defaultProps = {
    displayModal: false,
    user: {
      id: ''
    }
}

export default ModalComponent;