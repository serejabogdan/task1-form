// outsource dependencies
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import Select from 'react-select';
import Pagination from 'rc-pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faPlus, faSearch, faSort, faSortAmountDown, faSortAmountUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, Spinner, Table } from 'reactstrap';

// local dependencies
import { TYPE, selector } from './reducer';
import FontIcon from '../../../components/font-icon';
import { SIZE } from '../../../constants/query-params-validation';

// styles
import './styles.css';
import 'rc-pagination/assets/index.css';

const selectOptions = [
  { value: 'USER', label: 'USER' },
  { value: 'CHEF', label: 'CHEF' },
  { value: 'SUPER_ADMIN', label: 'SUPER_ADMIN' },
  { value: 'NUTRITIONIST', label: 'NUTRITIONIST' },
  { value: 'TALENT_ADMIN', label: 'TALENT_ADMIN' },
  { value: 'DATABASE_MANAGER', label: 'DATABASE_MANAGER' },
];

function Users () {
  const {
    data,
    size,
    page,
    name,
    sortField,
    initialized,
    hasAllUsersChecked,
    sortDirectionBoolean,
    isActionsDropdownDisabled,
  } = useSelector(selector);
  const dispatch = useDispatch();

  const [isTableDropdownOpened, setTableDropdownOpened] = useState(false);
  const [isActionsDropdownOpened, setActionsDropdownOpened] = useState(false);

  const content = useMemo(
    () => {
      if (Array.isArray(data.content)) {
        return data.content.map(user => {
          const createdDate = typeof user.createdDate === 'string' ? moment(user.createdDate) : '';
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

  const handleChangeNumberOfUsers = (size) => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { page: 0, size } });

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
    () => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { name: '' } }),
    [dispatch]
  );

  const handleGetUsersBySearch = useCallback(
    () => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { page: 0 } }),
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
      dispatch({ type: TYPE.UPDATE_FILTERS, payload: { page: 0, roles: hasRolesValue } });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE });
    return () => {
      console.log('users is destructured');
    };
  }, [dispatch]);

  const getSortIcon = useCallback((name) => {
    if (sortField !== name) {
      return <FontIcon icon={faSort} className="text-gray" />;
    }
    if (sortDirectionBoolean) {
      return <FontIcon icon={faSortAmountDown} className="text-gray-d" />;
    }
    return <FontIcon icon={faSortAmountUp} className="text-gray-d" />;
  }, [sortDirectionBoolean, sortField]);

  const setSortName = useCallback((fieldName) => {
    if (sortField === fieldName) {
      dispatch({
        type: TYPE.UPDATE_FILTERS,
        payload: {
          sort: `${fieldName},${!sortDirectionBoolean ? 'ASC' : 'DESC'}`,
          sortDirectionBoolean: !sortDirectionBoolean
        }
      });
    } else {
      dispatch({
        type: TYPE.UPDATE_FILTERS,
        payload: {
          sort: `${fieldName},ASC`,
          sortField: fieldName,
          sortDirectionBoolean: true
        }
      });
    }
  }, [dispatch, sortDirectionBoolean, sortField]);

  const sortByName = useCallback(() => setSortName('name'), [setSortName]);
  const sortById = useCallback(() => setSortName('id'), [setSortName]);
  const sortByRoles = useCallback(() => setSortName('roles'), [setSortName]);
  const sortByCreatedDate = useCallback(() => setSortName('createdDate'), [setSortName]);

  return initialized
    ? <div className="content d-flex flex-column overflow-hidden vh-100">
      <div className="container-fluid">
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
                { SIZE.map(size => {
                  return <DropdownItem key={size} onClick={() => handleChangeNumberOfUsers(size)} >
                    { size } items
                  </DropdownItem>;
                }) }
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="role col-3">
            <Select isClearable={true} onChange={handleChangeSelectedRole} options={selectOptions} placeholder="Roles" />
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
                      <Input type="checkbox" checked={hasAllUsersChecked} readOnly onChange={handleSelectedAllUsers} />
                    </div>
                    <button className="text-nowrap btn btn-outline-link" onClick={sortByName}>
                      { getSortIcon('name') } <strong className="text-primary">Name</strong>
                    </button>
                  </div>
                </th>
                <th className="col-1">
                  <button className="text-nowrap btn btn-outline-link" onClick={sortById}>
                    { getSortIcon('id') } <strong className="text-primary">id</strong>
                  </button>
                </th>
                <th className="col-2">
                  <button className="text-nowrap btn btn-outline-link" disabled={true} onClick={sortByRoles}>
                    { getSortIcon('roles') } Roles
                  </button>
                </th>
                <th className="col-2">
                  <button className="text-nowrap btn btn-outline-link" onClick={sortByCreatedDate}>
                    { getSortIcon('createdDate') } <strong className="text-primary">Creation Date</strong>
                  </button>
                </th>
                <th className="col-1 align-middle">
                  <h6 className="m-0 font-weight-bold text-primary">Actions</h6>
                </th>
              </tr>
            </thead>
          </Table>
        </div>
        <div className="mb-3" style={{ position: 'relative', overflow: 'hidden', height: '60vh' }}>
          <div style={{ position: 'absolute', overflowY: 'scroll', inset: '0px', marginRight: '-17px' }}>
            <Table striped bordered>
              <tbody>
                { content.map(user => {
                  return <tr key={user.id}>
                    <td className="col-4 align-middle">
                      <div className="d-flex align-items-center">
                        <div className="check d-inline-block custom-checkbox custom-control">
                          <Input type="checkbox" checked={user.checked} readOnly onChange={user.onSelect} />
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
      <Spinner color="primary" />
    users
    </div>;
}

export default React.memo(Users);
