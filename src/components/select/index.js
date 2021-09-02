import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

function Select ({ input, meta, options, label, required, isMulti }) {
  const requiredStyles = {
    container: styles => ({ ...styles, outline: 'none' }),
    placeholder: styles => ({ ...styles, color: 'red' }),
    dropdownIndicator: styles => ({ ...styles, color: 'red' }),
    indicatorSeparator: styles => ({ ...styles, backgroundColor: 'red' }),
    control: styles => ({
      ...styles,
      boxShadow: 0,
      border: '1px solid red',
      '&:hover': {
        borderColor: 'red'
      }
    }),
  };
  return <FormGroup>
    { label && <Label for={input.name}>
      <strong className={required ? 'required' : ''}>
        { label } { ' ' }
      </strong>
    </Label> }
    <ReactSelect
      id={input.name}
      isMulti={isMulti}
      {...input}
      options={options}
      placeholder={label}
      classNamePrefix="select"
      className={`basic-multi-select ${meta.touched && meta.error ? 'is-invalid' : ''}`}
      onBlur={() => input.onBlur(input.value)}
      styles={meta.touched && meta.error && requiredStyles}
    />
    { meta.touched && (meta.error && <FormFeedback valid={!!(meta.touched && !meta.error)}>
      { meta.error }
    </FormFeedback>) }
  </FormGroup>;
}

Select.defaultProps = {
  label: '',
  isMulti: false,
  required: false,
};

Select.propTypes = {
  label: PropTypes.string,
  isMulti: PropTypes.bool,
  required: PropTypes.bool,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default Select;
