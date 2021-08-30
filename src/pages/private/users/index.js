// outsource dependencies
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import Select from 'react-select';
import Pagination from 'rc-pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, Spinner, Table } from 'reactstrap';

// local dependencies
import { TYPE, selector } from './reducer';
import FontIcon from '../../../components/font-icon';
import SortField from '../../../components/sort-field';
import { roles } from '../../../constants/select-options';
import { EMPTY_STRING, START_PAGE } from '../../../constants/common';
import { SIZES, SORT_FIELDS } from '../../../constants/valid-query-params';

// styles
import './styles.css';
import 'rc-pagination/assets/index.css';

function Users () {
  const {
    data,
    size,
    page,
    name,
    initialized,
    hasAllUsersChecked,
    roles: currentRoles,
    isActionsDropdownDisabled,
  } = useSelector(selector);
  const dispatch = useDispatch();

  const [isTableDropdownOpened, setTableDropdownOpened] = useState(false);
  const [isActionsDropdownOpened, setActionsDropdownOpened] = useState(false);

  const content = useMemo(
    () => {
      if (Array.isArray(data.content)) {
        return data.content.map(user => {
          const createdDate = typeof user.createdDate === 'string' ? moment(user.createdDate) : EMPTY_STRING;
          const roles = Array.isArray(user.roles) ? user.roles : [];
          const onSelect = () => dispatch({ type: TYPE.USER_SELECTED, payload: { userId: user.id } });
          return { ...user, createdDate, roles, onSelect };
        });
      }
      return [];
    },
    [data.content, dispatch]
  );

  const handleChangePage = useCallback(
    page => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { page: page - 1 } }),
    [dispatch]
  );

  const handleChangeNumberOfUsers = (size) => dispatch({
    type: TYPE.UPDATE_FILTERS,
    payload: { page: START_PAGE, size }
  });

  const handleToggleTableDropdown = useCallback(
    () => setTableDropdownOpened(state => !state),
    [setTableDropdownOpened]
  );

  const handleToggleActionsDropdown = useCallback(
    () => setActionsDropdownOpened(state => !state),
    [setActionsDropdownOpened]
  );

  // function gets event for getting value by target to keep the right memo
  const handleChangeSearch = useCallback(
    (event) => dispatch({ type: TYPE.META, payload: { name: event.target.value } }),
    [dispatch]
  );

  const handleClearSearch = useCallback(
    () => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { name: EMPTY_STRING } }),
    [dispatch]
  );

  const handleGetUsersBySearch = useCallback(
    () => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { page: START_PAGE } }),
    [dispatch]
  );

  const handleSubmitSearch = useCallback(event => {
    if (event.key === 'Enter') {
      handleGetUsersBySearch();
    }
  }, [handleGetUsersBySearch]);

  const handleSelectedAllUsers = useCallback(() => dispatch({ type: TYPE.USERS_SELECTED }), [dispatch]);

  const handleChangeSelectedRole = useCallback(
    (selectedRole) => {
      const hasRolesValue = selectedRole ? [selectedRole.value] : [];
      dispatch({ type: TYPE.UPDATE_FILTERS, payload: { page: START_PAGE, roles: hasRolesValue } });
    },
    [dispatch]
  );

  const role = useMemo(() => {
    const [currentRole] = currentRoles;
    return currentRoles.length ? { value: currentRole, label: currentRole } : null;
  }, [currentRoles]);

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE });
    return () => {
      console.log('users is destructured');
    };
  }, [dispatch]);

  return initialized
    ? <div className="content d-flex flex-column overflow-hidden vh-100">
      <div className="container-fluid flex-grow-1 overflow-hidden mb-3">
        <h2 className="pt-3 text-primary">Users</h2>
        <hr className="row" />
        <div className="row mb-3">
          <div className="search col-4">
            <InputGroup>
              { name && <InputGroupAddon addonType="prepend" onClick={handleClearSearch}>
                <Button color="primary">
                  <FontIcon icon={faTimes} />
                </Button>
              </InputGroupAddon> }
              <Input
                placeholder="⌕ Search"
                value={name}
                onChange={handleChangeSearch}
                onKeyPress={handleSubmitSearch} />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={handleGetUsersBySearch}>
                  <FontIcon icon={faSearch} />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="dropdown col-1">
            <Dropdown color="primary" group isOpen={isTableDropdownOpened} toggle={handleToggleTableDropdown}>
              <DropdownToggle caret color="secondary">
                { size }
              </DropdownToggle>
              <DropdownMenu>
                { SIZES.map(size => {
                  return <DropdownItem key={size} onClick={() => handleChangeNumberOfUsers(size)} >
                    { size } items
                  </DropdownItem>;
                }) }
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="role col-3">
            <Select isClearable={true} onChange={handleChangeSelectedRole} options={roles} placeholder="Roles" value={role} />
          </div>
          <div className="d-flex justify-content-end col-4">
            <Dropdown group isOpen={isActionsDropdownOpened} toggle={handleToggleActionsDropdown}>
              <DropdownToggle caret color="secondary" disabled={isActionsDropdownDisabled}>
                List actions
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem disabled={isActionsDropdownDisabled}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Link to="#" className="mx-2 btn btn-success">
              <FontIcon icon={faPlus} className="mr-1" /> Create User
            </Link>
          </div>
        </div>
        <div className="table-header">
          <Table>
            <thead>
              <tr>
                <th className="col-4">
                  <div className="d-flex align-items-center">
                    <div className="check d-inline-block custom-checkbox custom-control">
                      <Input type="checkbox" disabled={!content.length} checked={hasAllUsersChecked} onChange={handleSelectedAllUsers} />
                    </div>
                    <SortField sortFieldName={SORT_FIELDS.NAME}>
                      <strong className="text-primary">Name</strong>
                    </SortField>
                  </div>
                </th>
                <th className="col-1">
                  <SortField sortFieldName={SORT_FIELDS.ID}>
                    <strong className="text-primary">id</strong>
                  </SortField>
                </th>
                <th className="col-2">
                  <SortField sortFieldName={SORT_FIELDS.ROLES}>
                    Roles
                  </SortField>
                </th>
                <th className="col-2">
                  <SortField sortFieldName={SORT_FIELDS.CREATED_DATE}>
                    <strong className="text-primary">Creation Date</strong>
                  </SortField>
                </th>
                <th className="col-1 align-middle">
                  <h6 className="m-0 font-weight-bold text-primary">Actions</h6>
                </th>
              </tr>
            </thead>
          </Table>
        </div>
        <div className="mb-3" style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
          <div style={{ position: 'absolute', overflowY: 'scroll', inset: '0px', marginRight: '-10px' }}>
            <Table striped bordered>
              <tbody>
                { content.map((user, index) => {
                  return <tr key={index}>
                    <td className="col-4 align-middle">
                      <div className="d-flex align-items-center">
                        <div className="check d-inline-block custom-checkbox custom-control">
                          <Input type="checkbox" checked={user.checked} onChange={user.onSelect} />
                        </div>
                        <Link to="#" className="btn btn-link">{ user.name ? user.name : 'Undefined Name' }</Link>
                      </div>
                    </td>
                    <td className="col-1 align-middle">{ user.id }</td>
                    <td className="col-2 align-middle">
                      { user.roles.map(role => <Badge key={role.id} className="bg-danger mr-1">{ role.name } </Badge>) }
                    </td>
                    <td className="col-2 align-middle">{ user.createdDate.format('L') }</td>
                    <td className="col-1 align-middle">
                      <Link to="#" className="p-1 btn btn-link btn-sm">Edit</Link> / <button className="p-1 btn btn-link btn-sm">Delete</button>
                    </td>
                  </tr>;
                }) }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div className="pagination mb-3" style={{ margin: '0 auto' }}>
        <Pagination
          onChange={handleChangePage}
          current={page + 1}
          defaultCurrent={1}
          total={data.totalElements}
          pageSize={size}
        />
      </div>
    </div> : <div>
      <Spinner color="primary" /> users
    </div>;
}

export default React.memo(Users);
