import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

function MultiSelect ({ input, options }) {
  const { onBlur, ...formInput } = input;

  return <Select
    isMulti
    {...formInput}
    options={options}
    classNamePrefix="select"
    className="basic-multi-select"
  />;
}

MultiSelect.propTypes = {
  input: PropTypes.any.isRequired,
  options: PropTypes.object.isRequired
};

export default MultiSelect;
