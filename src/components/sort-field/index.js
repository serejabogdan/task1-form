// outsource dependencies
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { faSort, faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

// local dependencies
import FontIcon from '../font-icon';
import { TYPE, selector } from '../../pages/private/users/reducer';

function SortField ({ sortFieldName, children, disabled }) {
  const dispatch = useDispatch();
  const { currentSortField, sortDirectionBoolean } = useSelector(selector);
  const getSortIcon = useCallback((name) => {
    if (currentSortField !== name) {
      return <FontIcon icon={faSort} className="text-gray" />;
    }
    if (sortDirectionBoolean) {
      return <FontIcon icon={faSortAmountDown} className="text-gray-d" />;
    }
    return <FontIcon icon={faSortAmountUp} className="text-gray-d" />;
  }, [sortDirectionBoolean, currentSortField]);

  const sortBy = useCallback(
    () => dispatch({ type: TYPE.SORT_BY, payload: sortFieldName }),
    [dispatch, sortFieldName]
  );

  return <button disabled={disabled} className="text-nowrap btn btn-outline-link" onClick={sortBy}>
    { getSortIcon(sortFieldName) } { children }
  </button>;
}

SortField.defaultProps = {
  disabled: false,
  children: 'Field',
};

SortField.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  sortFieldName: PropTypes.string.isRequired,
};

export default SortField;
