// outsource dependencies
import React, { useEffect } from 'react';
import Pagination from 'rc-pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Spinner,
  Table
} from 'reactstrap';

// local dependencies
import { TYPE, selector } from './reducer';
import { setLocalStorage } from '../../../utils/local-storage';
import { CURRENT_PAGE, USERS_NUMBER } from '../../../constants/local-storage';

// styles
import 'rc-pagination/assets/index.css';

function fixDate (digit) {
  return digit < 10 ? `0${digit}` : digit;
}

function stringDateToObject (date) {
  const createdDate = new Date(date);
  return `${fixDate(createdDate.getMonth())}/${fixDate(createdDate.getDate())}/${fixDate(createdDate.getFullYear())}`;
}

function Users () {
  const { initialized, data, pagination, dropdown, usersChecked } = useSelector(selector);
  const dispatch = useDispatch();

  function changePage (page) {
    dispatch({ type: TYPE.PAGINATION_META, payload: { currentPage: page } });
    dispatch({ type: TYPE.GET_USERS, payload: { page, size: dropdown.numberOfUsers } });
    setLocalStorage(CURRENT_PAGE, page);
  }

  function changeNumberOfUsers (size) {
    dispatch({ type: TYPE.PAGINATION_META, payload: { currentPage: 0 } });
    dispatch({ type: TYPE.DROPDOWN_META, payload: { numberOfUsers: size } });
    dispatch({ type: TYPE.GET_USERS, payload: { size, page: 0 } });
    setLocalStorage(USERS_NUMBER, size);
  }

  function dropdownToggle () {
    dispatch({ type: TYPE.DROPDOWN_META, payload: { isOpen: !dropdown.isOpen } });
  }

  function hasUsersChecked (checked) {
    dispatch({ type: TYPE.META, payload: { usersChecked: checked } });
  }

  useEffect(() => {
    dispatch({ type: TYPE.GET_USERS, payload: { page: pagination.currentPage, size: dropdown.numberOfUsers } });
  }, [dispatch, dropdown.numberOfUsers, pagination.currentPage]);

  return initialized ? <div className="h-100 container-fluid">
    <h2 className="pt-3">USERS</h2>
    <header className="d-flex">
      <Dropdown group isOpen={dropdown.isOpen} toggle={() => { dropdownToggle(); }}>
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
                <Input type="checkbox" checked={usersChecked} />
              </FormGroup>
            </td>
            <td>{ user.name }</td>
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
