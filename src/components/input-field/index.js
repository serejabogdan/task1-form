import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';

function InputField ({ input, type, id, label, meta, disabled }) {
  return (
    <FormGroup>
      <Label for={id}>{ label }</Label>
      <Input disabled={disabled} type={type} id={id} placeholder={label} {...input}/>
      { meta.touched && ((meta.error && <span>{ meta.error }</span>)) }
    </FormGroup>
  );
}

InputField.defaultProps = {
  id: '',
  label: '',
  meta: {
    touched: false,
    warning: '',
    error: ''
  },
  disabled: false
};

// TODO: CHECK propTypes and jsx

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    warning: PropTypes.string,
    error: PropTypes.string
  }),
  disabled: PropTypes.bool
};

export default InputField;
