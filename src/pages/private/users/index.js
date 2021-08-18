// outsource dependencies
import React, { useCallback, useEffect, useMemo } from 'react';
import moment from 'moment';
import Select from 'react-select';
import Pagination from 'rc-pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, Spinner, Table } from 'reactstrap';

// local dependencies
import { TYPE, selector } from './reducer';

// styles
import 'rc-pagination/assets/index.css';

const selectOptions = [
  { value: 'USER', label: 'USER' },
  { value: 'CHEF', label: 'CHEF' },
  { value: 'SUPER_ADMIN', label: 'SUPER_ADMIN' },
  { value: 'NUTRITIONIST', label: 'NUTRITIONIST' },
  { value: 'TALENT_ADMIN', label: 'TALENT_ADMIN' },
  { value: 'DATABASE_MANAGER', label: 'DATABASE_MANAGER' },
];

const numberOfUsers = [10, 15, 30];

function Users () {
  const {
    data,
    size,
    page,
    name,
    initialized,
    selectedRole,
    hasOpenedDropdown,
    hasAllUsersChecked,
  } = useSelector(selector);
  const dispatch = useDispatch();

  const content = useMemo(
    () => {
      if (Array.isArray(data.content)) {
        return data.content.map(user => {
          const createdDate = typeof user.createdDate === 'string' ? moment(user.createdDate) : '';
          const roles = Array.isArray(user.roles) ? user.roles : [];
          return { ...user, createdDate, roles };
        });
      }
      return [];
    },
    [data.content]
  );

  const handleChangePage = useCallback(
    page => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { page: page - 1, size, name } }),
    [dispatch, name, size]
  );

  const handleChangeNumberOfUsers = (size) => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { page: 0, size, name } });

  const handleDropdownToggle = useCallback(
    () => dispatch({ type: TYPE.META, payload: { hasOpenedDropdown: !hasOpenedDropdown } }),
    [dispatch, hasOpenedDropdown]
  );

  // function gets event for getting value by target to keep the right memo
  const handleChangeSearch = useCallback(
    (event) => dispatch({ type: TYPE.META, payload: { name: event.target.value } }),
    [dispatch]
  );

  const handleClearSearch = useCallback(
    () => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { page, size, name: '' } }),
    [dispatch, page, size]
  );

  const handleGetUsersBySearch = useCallback(
    () => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { size, page: 0, name } }),
    [dispatch, name, size]
  );

  const handleSubmitSearch = useCallback(event => {
    if (event.key === 'Enter') {
      handleGetUsersBySearch();
    }
  }, [handleGetUsersBySearch]);

  const handleUsersSelected = () => dispatch({ type: TYPE.USERS_SELECTED });

  const handleUserSelected = userId => dispatch({ type: TYPE.USER_SELECTED, payload: { userId } });

  const handleChangeSelectedRole = useCallback(
    (selectedRole) => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { size, page: 0, roles: [selectedRole.value] } }),
    [dispatch, size]
  );

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE });
    return () => {
      console.log('users is destructured');
    };
  }, [dispatch]);

  return initialized
    ? <div className="content d-flex flex-column overflow-hidden vh-100">
      <div className="container-fluid flex-grow-1">
        <h2 className="pt-3 text-primary">Users</h2>
        <hr className="row" />
        <div className="row mb-3">
          <div className="search col-4">
            <InputGroup>
              { name && <InputGroupAddon addonType="prepend" onClick={handleClearSearch}>
                <Button color="primary">X</Button>
              </InputGroupAddon> }
              <Input
                placeholder="Search"
                value={name}
                onChange={handleChangeSearch}
                onKeyPress={handleSubmitSearch} />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={handleGetUsersBySearch}>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="dropdown col-1">
            <Dropdown color="primary" group isOpen={hasOpenedDropdown} toggle={handleDropdownToggle}>
              <DropdownToggle caret color="secondary">
                { size }
              </DropdownToggle>
              <DropdownMenu>
                { numberOfUsers.map(size => {
                  return <DropdownItem key={size} onClick={() => handleChangeNumberOfUsers(size)} >
                    { size } items
                  </DropdownItem>;
                }) }
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="role col-3">
            <Select value={selectedRole} onChange={handleChangeSelectedRole} options={selectOptions} />
          </div>
          <div className="d-flex justify-content-end col-4">
            <Dropdown group isOpen={false} toggle={() => {}}>
              <DropdownToggle caret color="secondary" disabled={true}>
            List actions
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem disabled={true}>
                Menu is broken. Bye!
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Link href="#" className="mx-2 btn btn-success">Create User</Link>
          </div>
        </div>
        <div className="table-header">
          <Table>
            <thead style={{ position: 'sticky' }}>
              <tr>
                <th className="col-4">
                  <div className="d-flex align-items-center">
                    <div className="check d-inline-block custom-checkbox custom-control">
                      <Input type="checkbox" checked={hasAllUsersChecked} onClick={handleUsersSelected} />
                    </div>
                    <button className="text-nowrap btn btn-outline-link">
                      <FontAwesomeIcon icon={faArrowUp} /> Name
                    </button>
                  </div>
                </th>
                <th className="col-1">
                  <button className="text-nowrap btn btn-outline-link">
                    <FontAwesomeIcon icon={faArrowUp} /> Id
                  </button></th>
                <th className="col-2">
                  <button className="text-nowrap btn btn-outline-link" disabled={true}>
                    Roles
                  </button>
                </th>
                <th className="col-2">
                  <button className="text-nowrap btn btn-outline-link">
                    <FontAwesomeIcon icon={faArrowUp} /> Creation Date
                  </button></th>
                <th className="col-1">
                  <button className="text-nowrap btn btn-outline-link">
                    <FontAwesomeIcon icon={faArrowUp} /> Actions
                  </button></th>
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
                    <td className="col-4">
                      <div className="d-flex align-items-center">
                        <div className="check d-inline-block custom-checkbox custom-control">
                          <Input type="checkbox" checked={user.checked} onChange={() => handleUserSelected(user.id)} />
                        </div>
                        <Link href="#" className="btn btn-link">{ user.name ? user.name : 'Undefined Name' }</Link>
                      </div>
                    </td>
                    <td className="col-1">{ user.id }</td>
                    <td className="col-2">
                      { user.roles.map(role => <Badge key={role.id} className="bg-danger mr-1">{ role.name } </Badge>) }
                    </td>
                    <td className="col-2">{ user.createdDate.format('L') }</td>
                    <td className="col-1">
                      <Link href="#" className="p-1 btn btn-link btn-sm">Edit</Link> / <button className="p-1 btn btn-link btn-sm">Delete</button>
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
