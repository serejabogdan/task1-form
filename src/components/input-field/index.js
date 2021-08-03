import React from 'react';
import { Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';

function InputField ({ input, type, id, label, meta: { touched, warning, error }, disabled }) {
  const errorMessage = <span>{ error }</span>;
  const hasError = touched && ((error && errorMessage) || (warning && errorMessage));
  return (
    <div>
      <Label for={id}>{ label }</Label>
      <Input disabled={disabled} type={type} id={id} placeholder={label} {...input}/>
      { hasError }
    </div>
  );
}

InputField.defaultProps = {
  input: {},
  type: '',
  id: '',
  label: '',
  meta: {
    touched: false,
    warning: '',
    error: ''
  },
  disabled: false
};

InputField.propTypes = {
  input: PropTypes.object,
  type: PropTypes.string,
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
