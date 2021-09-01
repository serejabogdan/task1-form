// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

// styles
import './input-field.css';

function InputField ({ id, label, input, meta, required, ...props }) {
  return <FormGroup>
    { label && <Label for={id}>
      <strong className={required ? 'required' : null}>
        { label } { ' ' }
      </strong>
    </Label> }
    <Input
      {...input}
      placeholder={label}
      valid={!!(meta.touched && !meta.error)}
      invalid={!!(meta.touched && meta.error)}
      {...props}
    />
    { meta.touched && (meta.error && <FormFeedback valid={!!(meta.touched && !meta.error)}>
      { meta.error }
    </FormFeedback>) }

  </FormGroup>;
}

InputField.defaultProps = {
  label: '',
  disabled: false,
  required: false
};

InputField.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    warning: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
};

export default InputField;
