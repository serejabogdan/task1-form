// outsource dependencies
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { faSort, faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

// local dependencies
import FontIcon from '../font-icon';
import { TYPE, selector } from '../../pages/private/users/reducer';

function SortField ({ sortFieldName, children }) {
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

  return <button className="text-nowrap btn btn-outline-link" onClick={sortBy}>
    { getSortIcon(sortFieldName) } { children }
  </button>;
}

SortField.defaultProps = {
  children: 'Field'
};

SortField.propTypes = {
  sortFieldName: PropTypes.string.isRequired,
  children: PropTypes.any
};

export default SortField;
