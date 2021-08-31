import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';

function MultiSelect ({ input, options, id, label, required }) {
  const { onBlur, ...formInput } = input;

  return <FormGroup>
    <Label for={id}>
      <strong className={required ? 'required' : null}>
        { label } { ' ' }
      </strong>
    </Label>
    <Select
      id={id}
      isMulti
      {...formInput}
      options={options}
      classNamePrefix="select"
      className="basic-multi-select"
    />
  </FormGroup>;
}

MultiSelect.defaultProps = {
  label: '',
  required: false,
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default MultiSelect;
