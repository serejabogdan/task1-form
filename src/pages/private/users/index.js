// outsource dependencies
import React, { useCallback, useEffect, useMemo } from 'react';
import moment from 'moment';
import Select from 'react-select';
import Pagination from 'rc-pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Badge, Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, Row, Spinner, Table, UncontrolledDropdown } from 'reactstrap';

// local dependencies
import { TYPE, selector } from './reducer';
import FontIcon from '../../../components/font-icon';
import SortField from '../../../components/sort-field';
import { roleSelectOptions } from '../../../constants/select-options';
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
    initialized
  } = useSelector(selector);
  const dispatch = useDispatch();

  const content = useMemo(
    () => (data.content ?? []).map(user => {
      const createdDate = moment(user.createdDate, 'YYYY-MM-DD').isValid() ? moment(user.createdDate) : null;
      const onSelect = () => dispatch({ type: TYPE.USER_SELECTED, payload: { userId: user.id } });
      return { ...user, createdDate, onSelect };
    }),
    [data.content, dispatch]
  );

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

  const handleSelectedAllUsers = useCallback(() => dispatch({ type: TYPE.USERS_SELECTED }), [dispatch]);

  const handleChangeSelectedRole = useCallback(
    (role) => {
      dispatch({
        type: TYPE.UPDATE_FILTERS,
        payload: { page: 0, role: role ? role.value : '' }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE });
  }, [dispatch]);

  return initialized
    ? <div className="content d-flex flex-column overflow-hidden vh-100">
      <Container fluid className="flex-grow-1 overflow-hidden mb-3">
        <h2 className="pt-3 text-primary">Users</h2>
        <Row>
          <hr/>
        </Row>
        <Row className="mb-3">
          <Col xs="4" className="search">
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
                onKeyPress={event => (event.key === 'Enter') && handleGetUsersBySearch()} />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={handleGetUsersBySearch}>
                  <FontIcon icon={faSearch} />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <Col xs="1" className="dropdown">
            <UncontrolledDropdown color="primary" group>
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
            </UncontrolledDropdown>
          </Col>
          <Col xs="3" className="role">
            <Select
              isClearable
              onChange={handleChangeSelectedRole}
              options={roleSelectOptions}
              placeholder="Roles"
              value={roleSelectOptions.find(currentRole => currentRole.value === role)}
            />
          </Col>
          <Col xs="4" className="d-flex justify-content-end">
            <UncontrolledDropdown group>
              <DropdownToggle caret color="secondary" disabled={!content.some(user => user.checked)}>
                List actions
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem disabled={!content.some(user => user.checked)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Link to="#" className="mx-2 btn btn-success">
              <FontIcon icon={faPlus} className="mr-1" /> Create User
            </Link>
          </Col>
        </Row>
        <div className="mb-3" style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
          <div style={{ position: 'absolute', overflowY: 'auto', inset: '0px' }}>
            <Table striped bordered>
              <thead>
                <tr>
                  <th className="user-name">
                    <div className="d-flex align-items-center ">
                      <div className="check d-inline-block custom-checkbox custom-control">
                        <Input type="checkbox" disabled={!content.length} checked={content.every(user => user.checked)} onChange={handleSelectedAllUsers} />
                      </div>
                      <SortField sortFieldName={SORT_FIELDS.NAME}>
                        <strong className="text-primary">Name</strong>
                      </SortField>
                    </div>
                  </th>
                  <th className="user-id">
                    <SortField sortFieldName={SORT_FIELDS.ID}>
                      <strong className="text-primary">id</strong>
                    </SortField>
                  </th>
                  <th className="user-roles">
                    <SortField sortFieldName={SORT_FIELDS.ROLES}>
                    Roles
                    </SortField>
                  </th>
                  <th className="user-creation-date">
                    <SortField sortFieldName={SORT_FIELDS.CREATED_DATE}>
                      <strong className="text-primary">Creation Date</strong>
                    </SortField>
                  </th>
                  <th className="align-middle user-actions">
                    <h6 className="m-0 font-weight-bold text-primary">Actions</h6>
                  </th>
                </tr>
              </thead>
              <tbody>
                { content.map((user) => {
                  return <tr key={user.id}>
                    <td className="align-middle user-name">
                      <div className="d-flex align-items-center">
                        <div className="check d-inline-block custom-checkbox custom-control">
                          <Input type="checkbox" checked={user.checked || false} onChange={user.onSelect} />
                        </div>
                        <Link to="#" className="btn btn-link">{ user.name ? user.name : 'Undefined Name' }</Link>
                      </div>
                    </td>
                    <td className="align-middle user-id">{ user.id }</td>
                    <td className="align-middle user-roles">
                      { (user.roles ?? []).map(role => <Badge key={role.id} className="bg-danger mr-1">{ role.name } </Badge>) }
                    </td>
                    <td className="align-middle user-creation-date">{ user.createdDate.format('L') }</td>
                    <td className="align-middle user-actions">
                      <Link to="#" className="p-1 btn btn-link btn-sm">Edit</Link> / <button className="p-1 btn btn-link btn-sm">Delete</button>
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
