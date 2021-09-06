// outsource dependencies
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faSort, faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

// local dependencies
import FontIcon from '../font-icon';
import { TYPE, selector } from '../../pages/private/users/reducer';
import { SORT_DOWN, SORT_UP } from '../../constants/valid-query-params';

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

  const handleSortBy = useCallback(
    () => {
      const isFieldSame = currentSortField === sortFieldName;
      const hasDirectionChanged = isFieldSame ? !sortDirectionBoolean : true;
      const sortBy = isFieldSame
        ? `${sortFieldName},${hasDirectionChanged ? SORT_DOWN : SORT_UP}`
        : `${sortFieldName},${SORT_DOWN}`;
      dispatch({
        type: TYPE.UPDATE_FILTERS,
        payload: {
          sort: sortBy,
          currentSortField: sortFieldName,
          sortDirectionBoolean: hasDirectionChanged,
        }
      });
    },
    [currentSortField, dispatch, sortDirectionBoolean, sortFieldName]
  );

  return <button disabled={disabled} className="text-nowrap btn btn-outline-link" onClick={handleSortBy}>
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
