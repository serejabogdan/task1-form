import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal as ReactModal, ModalBody, ModalFooter, Button } from 'reactstrap';

function ModalButton ({ label, color, className, confirmDeletingUser }) {
  const [isOpened, setOpened] = useState(false);
  return <>
    <Button color={color} className={className} onClick={() => setOpened(true)}>{ label }</Button>
    <ReactModal isOpen={isOpened}>
      <ModalBody>
        Do you want to delete?
      </ModalBody>
      <ModalFooter>
        <Button className="mx-2 btn btn-success" onClick={confirmDeletingUser}>Ok</Button>
        <Button className="mx-2 btn btn-success" onClick={() => setOpened(false)}>Close</Button>
      </ModalFooter>
    </ReactModal>
  </>;
}

ModalButton.defaultProps = {
  color: 'primary',
  className: 'p-1 btn btn-sm',
};

ModalButton.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  confirmDeletingUser: PropTypes.func.isRequired,
};

export default ModalButton;
