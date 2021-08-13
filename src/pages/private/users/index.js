// outsource dependencies
import React, { useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, Spinner, Table } from 'reactstrap';

// local dependencies
import { TYPE, selector } from './reducer';

// styles
import 'rc-pagination/assets/index.css';

function Users () {
  const { initialized, data, size, page, hasAllUsersChecked, name, hasOpenedDropdown } = useSelector(selector);
  const dispatch = useDispatch();

  function changePage (page) {
    dispatch({ type: TYPE.META, payload: { hasAllUsersChecked: false } });
    dispatch({ type: TYPE.META, payload: { page } });
    dispatch({ type: TYPE.UPDATE_FILTERS });
  }

  function changeNumberOfUsers (size) {
    dispatch({ type: TYPE.META, payload: { hasAllUsersChecked: false } });
    dispatch({ type: TYPE.META, payload: { page: 0, size } });
    dispatch({ type: TYPE.UPDATE_FILTERS });
  }

  function dropdownToggle () {
    dispatch({ type: TYPE.META, payload: { hasOpenedDropdown: !hasOpenedDropdown } });
  }

  function changeSearch (name) {
    dispatch({ type: TYPE.META, payload: { name } });
  }

  function clearSearch () {
    dispatch({ type: TYPE.META, payload: { name: '' } });
    dispatch({ type: TYPE.UPDATE_FILTERS });
  }

  function searchSubmit (e) {
    if (e.key === 'Enter') {
      getUsersBySearch();
    }
  }

  function getUsersBySearch () {
    dispatch({ type: TYPE.META, payload: { size, page: 0, name } });
    dispatch({ type: TYPE.UPDATE_FILTERS });
  }

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE });
  }, [dispatch]);

  function userChecked (payload) {
    dispatch({ type: TYPE.USER_CHECKED, payload });
    dispatch({ type: TYPE.META, payload: { hasAllUsersChecked: false } });
  }

  function usersChecked () {
    dispatch({ type: TYPE.META, payload: { hasAllUsersChecked: !hasAllUsersChecked } });
    dispatch({ type: TYPE.USERS_CHECKED });
  }

  return initialized
    ? <div className="content d-flex flex-column overflow-hidden vh-100">
      <div className="container-fluid flex-grow-1">
        <h2 className="pt-3 text-primary">Users</h2>
        <hr className="row" />
        <div className="row mb-3">
          <div className="search col-4">
            <InputGroup>
              { name && <InputGroupAddon addonType="prepend" onClick={clearSearch}>
                <Button color="primary">X</Button>
              </InputGroupAddon> }
              <Input placeholder="Search" value={name} onChange={(e) => changeSearch(e.target.value)} onKeyPress={searchSubmit} />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={getUsersBySearch}>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="dropdown col-1">
            <Dropdown color="primary" group isOpen={hasOpenedDropdown} toggle={() => { dropdownToggle(); }}>
              <DropdownToggle caret color="secondary">
                { size }
              </DropdownToggle>
              <DropdownMenu>
                { [10, 15, 30].map(size => {
                  return <DropdownItem
                    key={size}
                    onClick={() => changeNumberOfUsers(size)} >
                    { size } items
                  </DropdownItem>;
                }) }
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="role col-3">
            <Input type="select" name="select">
              <option value="">Roles</option>
              <option>USER</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </div>
          <div className="d-flex justify-content-end col-4">
            <Dropdown group isOpen={false} toggle={() => {}}>
              <DropdownToggle caret color="secondary" disabled={true}>
            List actions
              </DropdownToggle>
              <DropdownMenu>
                { [10, 15, 30].map(size => {
                  return <DropdownItem key={size} >
                    { size } items
                  </DropdownItem>;
                }) }
              </DropdownMenu>
            </Dropdown>
            <Link href="" className="mx-2 btn btn-success">Create User</Link>
          </div>
        </div>
        <div className="table-header">
          <Table>
            <thead style={{ position: 'sticky' }}>
              <tr>
                <th className="col-4">
                  <div className="d-flex align-items-center">
                    <div className="check d-inline-block custom-checkbox custom-control">
                      <Input type="checkbox" checked={hasAllUsersChecked} onClick={usersChecked} />
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
                { data.content.map(user => {
                  const createdDate = moment(user.createdDate).format('L');
                  return <tr key={user.id}>
                    <td className="col-4">
                      <div className="d-flex align-items-center">
                        <div className="check d-inline-block custom-checkbox custom-control">
                          <Input type="checkbox" checked={user.checked} onChange={() => userChecked(user.id)} />
                        </div>
                        <Link href="#" className="btn btn-link">{ user.name ? user.name : 'Undefined Name' }</Link>
                      </div>
                    </td>
                    <td className="col-1">{ user.id }</td>
                    <td className="col-2">
                      { user.roles.map(role => <Badge key={role.id} className="bg-danger mr-1">{ role.name } </Badge>) }
                    </td>
                    <td className="col-2">{ createdDate }</td>
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
          onChange={page => changePage(page - 1)}
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

export default Users;
