// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';

function InputField ({ input, type, id, label, meta, disabled }) {
  return <FormGroup>
    <Label for={id}>{ label }</Label>
    <Input disabled={disabled} name={id} type={type} id={id} placeholder={id} {...input}/>
    { meta.touched && ((meta.error && <span>{ meta.error }</span>)) }
  </FormGroup>;
}

InputField.defaultProps = {
  disabled: false
};

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    warning: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
  disabled: PropTypes.bool
};

export default InputField;
