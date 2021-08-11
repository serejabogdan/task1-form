// outsource dependencies
import React, { useEffect } from 'react';
import Pagination from 'rc-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, InputGroup, InputGroupAddon, Spinner, Table } from 'reactstrap';

// local dependencies
import { TYPE, selector } from './reducer';
import { setLocalStorage } from '../../../utils/local-storage';
import { CURRENT_PAGE, USERS_NUMBER } from '../../../constants/local-storage';

// styles
import 'rc-pagination/assets/index.css';
import { history } from '../../../redux';
import { useHistory } from 'react-router-dom';

function fixDate (digit) {
  return digit < 10 ? `0${digit}` : digit;
}

function stringDateToObject (date) {
  const createdDate = new Date(date);
  return `${fixDate(createdDate.getMonth())}/${fixDate(createdDate.getDate())}/${fixDate(createdDate.getFullYear())}`;
}

function Users () {
  const { initialized, data, pagination, dropdown, usersChecked, search } = useSelector(selector);
  const dispatch = useDispatch();

  function changePage (page) {
    dispatch({ type: TYPE.PAGINATION_META, payload: { currentPage: page } });
    dispatch({ type: TYPE.GET_USERS, payload: { params: { page, size: dropdown.numberOfUsers } } });
  }

  function changeNumberOfUsers (size) {
    dispatch({ type: TYPE.PAGINATION_META, payload: { currentPage: 0 } });
    dispatch({ type: TYPE.DROPDOWN_META, payload: { numberOfUsers: size } });
    dispatch({ type: TYPE.GET_USERS, payload: { params: { size, page: 0 } } });
  }

  function dropdownToggle () {
    dispatch({ type: TYPE.DROPDOWN_META, payload: { isOpen: !dropdown.isOpen } });
  }

  function hasUsersChecked (checked) {
    dispatch({ type: TYPE.META, payload: { usersChecked: checked } });
  }

  function changeSearch (searchValue) {
    dispatch({ type: TYPE.META, payload: { search: searchValue } });
  }

  function clearSearch () {
    dispatch({ type: TYPE.META, payload: { search: '' } });
  }

  function searchSubmit (e) {
    console.log(e);
  }

  function getUsersBySearch () {
    dispatch({
      type: TYPE.GET_USERS,
      payload: {
        params: { size: dropdown.numberOfUsers, page: 0 },
        data: { name: search }
      }
    });
  }
  const h = useHistory();

  useEffect(() => {

    console.log(h.location.search);

    dispatch({
      type: TYPE.GET_USERS,
      payload: { params: { page: pagination.currentPage, size: dropdown.numberOfUsers } }
    });
  }, [dispatch, dropdown.numberOfUsers, h, pagination.currentPage]);

  return initialized ? <div className="h-100 container-fluid">
    <h2 className="pt-3">USERS</h2>
    <header className="d-flex">
      <Dropdown color="primary" group isOpen={dropdown.isOpen} toggle={() => { dropdownToggle(); }}>
        <DropdownToggle caret>
          { dropdown.numberOfUsers }
        </DropdownToggle>
        <DropdownMenu>
          { [10, 15, 30].map(numberOfUsers => {
            return <DropdownItem
              key={numberOfUsers}
              onClick={() => changeNumberOfUsers(numberOfUsers)} >
              { numberOfUsers } items
            </DropdownItem>;
          }) }
        </DropdownMenu>
      </Dropdown>
      <InputGroup className="w-25">
        { search && <InputGroupAddon addonType="prepend" onClick={clearSearch}>
          <Button color="primary">X</Button>
        </InputGroupAddon> }
        <Input placeholder="Search" value={search} onChange={(e) => changeSearch(e.target.value)} />
        <InputGroupAddon addonType="append">
          <Button color="primary" onClick={getUsersBySearch} onKeyPress={searchSubmit}>Search</Button>
        </InputGroupAddon>
      </InputGroup>
    </header>
    <Table striped bordered>
      <thead>
        <tr>
          <td>
            <FormGroup check>
              <Input type="checkbox" onClick={(e) => hasUsersChecked(e.target.checked)} />
            </FormGroup>
          </td>
          <th>Name</th>
          <th>Id</th>
          <th>Roles</th>
          <th>Creation Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { data.content.map(user => {
          const createdDate = stringDateToObject(user.createdDate);
          return <tr key={user.id}>
            <td scope="row">
              <FormGroup check>
                <Input type="checkbox" checked={usersChecked} onChange={e => console.log(e)} />
              </FormGroup>
            </td>
            <td>{ user.name ? user.name : 'Undefined Name' }</td>
            <td>{ user.id }</td>
            <td>
              { user.roles.map(role => <Badge key={role.id} className="bg-danger mr-1">{ role.name } </Badge>) }
            </td>
            <td>{ createdDate }</td>
          </tr>;
        }) }
      </tbody>
    </Table>
    <Pagination
      onChange={page => changePage(page - 1)}
      current={pagination.currentPage + 1}
      total={data.totalElements}
      pageSize={dropdown.numberOfUsers}
    />
  </div> : <div>
    <Spinner color="primary" />
    users
  </div>;
}

export default Users;
