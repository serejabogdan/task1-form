// outsource dependencies
import React, { useEffect } from 'react';
import moment from 'moment';
import Pagination from 'rc-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, InputGroup, InputGroupAddon, Spinner, Table } from 'reactstrap';

// local dependencies
import { TYPE, selector } from './reducer';

// styles
import 'rc-pagination/assets/index.css';

function Users () {
  const { initialized, data, size, page, usersChecked, search, hasOpenedDropdown } = useSelector(selector);
  const dispatch = useDispatch();

  function changePage (page) {
    dispatch({ type: TYPE.META, payload: { page } });
    dispatch({ type: TYPE.UPDATE_FILTERS });
  }

  function changeNumberOfUsers (size) {
    dispatch({ type: TYPE.META, payload: { page: 0, size } });
    dispatch({ type: TYPE.UPDATE_FILTERS });
  }

  function dropdownToggle () {
    dispatch({ type: TYPE.META, payload: { hasOpenedDropdown: !hasOpenedDropdown } });
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
        params: { size, page: 0 },
        data: { name: search }
      }
    });
  }

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE });
  }, [dispatch]);

  return initialized ? <div className="h-100 container-fluid">
    <h2 className="pt-3">USERS</h2>
    <header className="d-flex">
      <Dropdown color="primary" group isOpen={hasOpenedDropdown} toggle={() => { dropdownToggle(); }}>
        <DropdownToggle caret>
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
          const createdDate = moment(user.createdDate).format('L');
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
      current={page + 1}
      defaultCurrent={1}
      total={data.totalElements}
      pageSize={size}
    />
  </div> : <div>
    <Spinner color="primary" />
    users
  </div>;
}

export default Users;
