// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';

function InputField ({ id, type, label, input, disabled, meta }) {
  return <FormGroup>
    <Label for={id}>{ label }</Label>
    <Input disabled={disabled} type={type} id={id} placeholder={label} {...input}/>
    { meta.touched && ((meta.error && <span>{ meta.error }</span>)) }
  </FormGroup>;
}

InputField.defaultProps = {
  disabled: false
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    warning: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
};

export default InputField;
