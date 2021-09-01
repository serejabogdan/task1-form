// outside dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, FormGroup, Input, Label } from 'reactstrap';

// styles
import './style.css';

function DropZone ({ label, id, title, src, alt }) {
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
          <Input accept="image/jpe, image/jpg, image/jpeg, image/gif, image/png" type="file" className="file-input"/>
        </div>
      </FormGroup>
    </CardBody>
  </Card>;
}

DropZone.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DropZone;
