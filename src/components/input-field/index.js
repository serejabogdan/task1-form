// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

// styles
import './input-field.css';

function InputField ({ label, input, meta, required, ...props }) {
  return <FormGroup>
    <Label for={input.name} className="w-100">
      { label }
    </Label>
    <Input
      id={input.name}
      valid={meta.touched && !meta.error}
      invalid={meta.touched && !!meta.error}
      {...props}
      {...input}
    />
    { meta.touched && (meta.error && <FormFeedback valid={meta.touched && !meta.error}>
      { meta.error }
    </FormFeedback>) }
  </FormGroup>;
}

InputField.defaultProps = {
  disabled: false,
  required: false,
};

InputField.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.element.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }).isRequired,
};

export default InputField;
