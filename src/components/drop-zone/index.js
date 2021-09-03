// outside dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, FormGroup, Input, Label } from 'reactstrap';

// styles
import './style.css';

function DropZone ({ label, id, title, src, alt, disabled }) {
  return <Card className="mb-2">
    <CardHeader>
      <h4 className="mb-0 text-info card-title">
        <strong>
          { title }
        </strong>
      </h4>
    </CardHeader>
    <CardBody>
      <FormGroup>
        <Label for={id}>
          <strong>
            { label }
          </strong>
        </Label>
        <div className="drop-zone d-flex justify-content-center align-items-center">
          <img src={src} alt={alt}/>
          <Input
            type="file"
            disabled={disabled}
            className="file-input"
            accept="image/jpe, image/jpg, image/jpeg, image/gif, image/png"
          />
        </div>
      </FormGroup>
    </CardBody>
  </Card>;
}

DropZone.defaultProps = {
  disabled: false,
};

DropZone.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DropZone;
