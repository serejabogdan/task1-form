import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

function validateStyles (color) {
  return {
    container: styles => ({ ...styles, outline: 'none' }),
    dropdownIndicator: styles => ({ ...styles, color: color }),
    indicatorSeparator: styles => ({ ...styles, backgroundColor: color }),
    control: styles => ({
      ...styles,
      boxShadow: 0,
      border: `1px solid ${color}`,
      '&:hover': {
        borderColor: color
      }
    }),
  };
}

function Select ({ input, meta, options, label, isMulti, disabled, preprocessValue, postprocessValue, ...props }) {
  function validateSelect () {
    if (meta.touched) {
      return meta.error ? validateStyles('red') : validateStyles('green');
    }
  }
  return <FormGroup>
    { label && <Label for={input.name}>
      { label }
    </Label> }
    <ReactSelect
      {...input}
      id={input.name}
      options={options}
      isMulti={isMulti}
      isDisabled={disabled}
      styles={validateSelect()}
      getOptionValue={({ id }) => id}
      getOptionLabel={({ name }) => name}
      value={preprocessValue(input.value)}
      onBlur={() => input.onBlur(input.value)}
      onChange={(value) => input.onChange(postprocessValue(value))}
      className={`basic-multi-select ${meta.touched && meta.error ? 'is-invalid' : 'invalid'}`}
      {...props}
    />
    { meta.touched && (meta.error && <FormFeedback valid={meta.touched && !meta.error}>
      { meta.error }
    </FormFeedback>) }
  </FormGroup>;
}

Select.defaultProps = {
  isMulti: false,
  disabled: false,
};

Select.propTypes = {
  isMulti: PropTypes.bool,
  disabled: PropTypes.bool,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.element.isRequired,
  preprocessValue: PropTypes.func.isRequired,
  postprocessValue: PropTypes.func.isRequired,
};

export default Select;
