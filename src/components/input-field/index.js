// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

// styles
import './input-field.css';

function InputField ({ label, input, meta, required, children, ...props }) {
  return <FormGroup>
    { children ? children : label && <Label for={input.name}>
      <strong className={required ? 'required' : null}>
        { label } { ' ' }
      </strong>
    </Label> }
    <Input
      id={input.name}
      placeholder={label}
      valid={!!(meta.touched && !meta.error)}
      invalid={!!(meta.touched && meta.error)}
      {...props}
      {...input}
    />
    { meta.touched && (meta.error && <FormFeedback valid={!!(meta.touched && !meta.error)}>
      { meta.error }
    </FormFeedback>) }
  </FormGroup>;
}

InputField.defaultProps = {
  label: '',
  children: null,
  disabled: false,
  required: false,
};

InputField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }).isRequired,
};

export default InputField;
