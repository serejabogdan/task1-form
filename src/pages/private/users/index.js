// outsource dependencies
import moment from 'moment';
import Select from 'react-select';
import Pagination from 'rc-pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo } from 'react';
import { faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Badge, Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, Row, Spinner, Table, UncontrolledDropdown } from 'reactstrap';

// local dependencies
import { TYPE, selector } from './reducer';
import ModalButton from '../../../components/modal';
import FontIcon from '../../../components/font-icon';
import SortField from '../../../components/sort-field';
import { selector as pagesSelector } from '../../reducer';
import { TYPE as userEditType } from '../user-edit/reducer';
import { NEW_USER, USERS, USERS_EDIT } from '../../../constants/routes';
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
    role,
    disabled,
    initialized,
    selectedUsers,
  } = useSelector(selector);
  const { roles } = useSelector(pagesSelector);
  const dispatch = useDispatch();

  const content = useMemo(
    () => (data.content ?? []).map(user => {
      const createdDate = moment(user.createdDate, 'YYYY-MM-DD').isValid() ? moment(user.createdDate) : null;
      const onSelect = (event) => {
        const newSelectedUsers = event.target.checked
          ? selectedUsers.concat(user.id)
          : selectedUsers.filter(userId => userId !== user.id);
        dispatch({ type: TYPE.UPDATE_FILTERS, payload: { selectedUsers: newSelectedUsers } });
      };
      return { ...user, createdDate, onSelect };
    }),
    [data.content, dispatch, selectedUsers]
  );

  const handleSelectedUsers = useCallback((event) => {
    const selectedUsers = event.target.checked
      ? data.content.map(user => user.id)
      : [];
    dispatch({ type: TYPE.UPDATE_FILTERS, payload: { selectedUsers }
    });
  }, [data.content, dispatch]);

  const handleChangePage = useCallback(
    page => dispatch({ type: TYPE.UPDATE_FILTERS, payload: { page: page - 1 } }),
    [dispatch]
  );

  const handleChangeNumberOfUsers = size => dispatch({
    type: TYPE.UPDATE_FILTERS,
    payload: { page: 0, size }
  });

  const handleChangeSearch = useCallback(
    event => dispatch({ type: TYPE.META, payload: { name: event.target.value } }),
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

  const handleChangeSelectedRole = useCallback(
    (newRole) => {
      const newRoleValue = newRole && newRole.value ? newRole.value : '';
      if (newRoleValue === role) {
        return;
      }
      dispatch({
        type: TYPE.UPDATE_FILTERS,
        payload: { page: 0, role: newRoleValue }
      });
    },
    [dispatch, role]
  );

  const selectRolesOptions = useMemo(() => roles.map(role => ({ value: role.name, label: role.name })), [roles]);

  const handleDeletingUser = useCallback((users) => dispatch({
    type: userEditType.DELETE_USER,
    payload: users
  }), [dispatch]);

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE });
  }, [dispatch]);
  return initialized
    ? <div className="content d-flex flex-column overflow-hidden vh-100">
      <Container fluid className="flex-grow-1 overflow-hidden mb-3">
        <h2 className="pt-3 text-primary">Users</h2>
        <hr className="row" />
        <Row className="mb-3">
          <Col xs="4" className="search">
            <InputGroup>
              { name && <InputGroupAddon addonType="prepend" onClick={handleClearSearch}>
                <Button color="primary" disabled={disabled}>
                  <FontIcon icon={faTimes} />
                </Button>
              </InputGroupAddon> }
              <Input
                value={name}
                disabled={disabled}
                placeholder="⌕ Search"
                onChange={handleChangeSearch}
                onKeyPress={event => (event.key === 'Enter') && handleGetUsersBySearch()} />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={handleGetUsersBySearch} disabled={disabled}>
                  <FontIcon icon={faSearch} />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <Col xs="1" className="dropdown">
            <UncontrolledDropdown group>
              <DropdownToggle caret color="secondary" disabled={disabled}>
                { size }
              </DropdownToggle>
              <DropdownMenu>
                { SIZES.map(size => <DropdownItem key={size} onClick={() => handleChangeNumberOfUsers(size)} >
                  { size } items
                </DropdownItem>) }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
          <Col xs="3" className="role">
            <Select
              isClearable
              placeholder="Roles"
              isDisabled={disabled}
              options={selectRolesOptions}
              onChange={handleChangeSelectedRole}
              value={selectRolesOptions.find(currentRole => currentRole.value === role) || null}
            />
          </Col>
          <Col xs="4" className="d-flex justify-content-end">
            <UncontrolledDropdown group>
              <DropdownToggle caret color="secondary" disabled={!selectedUsers.length}>
                List actions
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  disabled={!selectedUsers.length}
                  onClick={() => handleDeletingUser(selectedUsers.map(userId => ({ id: userId })))}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Link to={NEW_USER.link()} className={`mx-2 btn btn-success ${disabled && 'disabled'}`}>
              <FontIcon icon={faPlus} className="mr-1" /> Create User
            </Link>
          </Col>
        </Row>
        <div className="mb-3" style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
          <div style={{ position: 'absolute', overflowY: 'auto', inset: 0 }}>
            <Table striped bordered>
              <thead>
                <tr>
                  <th className="user-name">
                    <div className="d-flex align-items-center ">
                      <div className="check d-inline-block custom-checkbox custom-control">
                        <Input
                          type="checkbox"
                          disabled={!content.length || disabled}
                          onChange={handleSelectedUsers}
                          checked={selectedUsers.length
                            ? content.every(user => selectedUsers.includes(user.id))
                            : false}
                        />
                      </div>
                      <SortField sortFieldName={SORT_FIELDS.NAME} disabled={!content.length || disabled}>
                        <strong className="text-primary">Name</strong>
                      </SortField>
                    </div>
                  </th>
                  <th className="user-id">
                    <SortField sortFieldName={SORT_FIELDS.ID} disabled={!content.length || disabled}>
                      <strong className="text-primary">id</strong>
                    </SortField>
                  </th>
                  <th className="user-roles">
                    <SortField disabled sortFieldName={SORT_FIELDS.ROLES}>
                    Roles
                    </SortField>
                  </th>
                  <th className="user-creation-date">
                    <SortField sortFieldName={SORT_FIELDS.CREATED_DATE} disabled={!content.length || disabled}>
                      <strong className="text-primary">Creation Date</strong>
                    </SortField>
                  </th>
                  <th className="align-middle user-actions">
                    <strong className="m-0 font-weight-bold text-primary">Actions</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                { content.map((user) => {
                  return <tr key={user.id}>
                    <td className="align-middle user-name">
                      <div className="d-flex align-items-center">
                        <div className="check d-inline-block custom-checkbox custom-control">
                          <Input
                            type="checkbox"
                            disabled={disabled}
                            onChange={user.onSelect}
                            checked={selectedUsers.includes(user.id) || false}
                          />
                        </div>
                        <Link to={USERS.link()} className="btn btn-link">{ user.name ? user.name : 'Undefined Name' }</Link>
                      </div>
                    </td>
                    <td className="align-middle w-10">{ user.id }</td>
                    <td className="align-middle w-20">
                      { (user.roles ?? []).map(role => <Badge key={role.id} className="bg-danger mr-1">{ role.name } </Badge>) }
                    </td>
                    <td className="align-middle w-10">{ user.createdDate.format('L') }</td>
                    <td className="align-middle w-10">
                      <Link to={USERS_EDIT.link(user.id)} className="p-1 btn btn-link btn-sm">Edit</Link> / <ModalButton className="p-1 btn btn-link btn-sm" color="link" label="Delete" confirmDeletingUser={() => handleDeletingUser([{ id: user.id }])} />
                    </td>
                  </tr>;
                }) }
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
      <div className="pagination mb-3" style={{ margin: '0 auto' }}>
        <Pagination
          onChange={handleChangePage}
          current={page + 1}
          defaultCurrent={1}
          total={data.totalElements}
          pageSize={size}
        />
      </div>
    </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spinner color="primary" />
    </div>;
}

export default React.memo(Users);
