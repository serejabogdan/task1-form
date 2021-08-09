// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';

function InputField ({ input, type, id, meta, disabled }) {
  return <FormGroup>
    <Label for={id}>{ id }</Label>
    <Input disabled={disabled} name={id} type={type} id={id} placeholder={id} {...input}/>
    { meta.touched && ((meta.error && <span>{ meta.error }</span>)) }
  </FormGroup>;
}

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    warning: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
  disabled: PropTypes.bool.isRequired
};

export default InputField;
