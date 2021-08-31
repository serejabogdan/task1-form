// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';

// styles
import './input-field.css';

function InputField ({ id, type, label, input, disabled, meta, required }) {
  return <FormGroup>
    <Label for={id}>
      <strong className={required ? 'required' : null}>
        { label } { ' ' }
      </strong>
    </Label>
    <Input disabled={disabled} type={type} id={id} placeholder={label} {...input}/>
    { meta.touched && ((meta.error && <span>{ meta.error }</span>)) }
  </FormGroup>;
}

InputField.defaultProps = {
  disabled: false,
  required: false
};

InputField.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    warning: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
};

export default InputField;
