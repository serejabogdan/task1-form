// outsource dependencies
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Row } from 'reactstrap';
import { Field, submit } from 'redux-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect } from 'react';

// local dependencies
import { selector, TYPE } from './reducer';
import Select from '../../../components/select';
import ModalButton from '../../../components/modal';
import DropZone from '../../../components/drop-zone';
import { ReduxForm } from '../../../utils/redux-form';
import InputField from '../../../components/input-field';
import { selector as pagesSelector } from '../../../pages/reducer';
import { suffixSelectOptions } from '../../../constants/select-options';

function formValidation (values) {
  const errors = {};
  const MAX_CHARACTERS = 30;

  if (!values.firstName) {
    errors.firstName = 'First name is required';
  } else if (values.firstName.length > MAX_CHARACTERS) {
    errors.firstName = `Maximum ${MAX_CHARACTERS} characters`;
  } else if (!/\w/.test(values.firstName)) {
    errors.firstName = 'Latin alphabet only';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  } else if (values.lastName.length > MAX_CHARACTERS) {
    errors.lastName = `Last ${MAX_CHARACTERS} characters`;
  } else if (!/\w/.test(values.lastName)) {
    errors.lastName = 'Latin alphabet only';
  }

  if (!values?.roles?.length) {
    errors.roles = 'Roles are required';
  }

  const isEmailRegEx = (value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (isEmailRegEx(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

function UserEdit () {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { roles } = useSelector(pagesSelector);
  const { user, disabled } = useSelector(selector);
  const isId = !!id;

  const handleEditUserSubmit = useCallback(value => dispatch({
    type: TYPE.EDIT_USER,
    payload: value
  }), [dispatch]);
  const handleCreateUserSubmit = useCallback((value) => dispatch({
    type: TYPE.CREATE_USER,
    payload: value
  }), [dispatch]);
  const handleDeleteUser = useCallback(() => dispatch({
    type: TYPE.DELETE_USER,
    payload: [{ id }]
  }), [dispatch, id]);

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE, payload: { id } });
  }, [dispatch, id]);

  return <div className="content d-flex flex-column vh-100">
    <header className="p-3 d-flex justify-content-between">
      <h2 className="text-info mb-0">User edit page</h2>
      { isId && <Col xs="4" className="text-right">
        <ModalButton disabled={disabled} className="btn btn-danger" label="Delete User" confirmDeletingUser={handleDeleteUser} />
      </Col> }
    </header>
    <Container fluid className="flex-grow-1 mb-3">
      <div className="mb-3">
        <ReduxForm
          form="UserEdit"
          initialValues={user}
          validate={formValidation}
          onSubmit={isId ? handleEditUserSubmit : handleCreateUserSubmit}
        >
          <Row className="w-100">
            <Col xs="8">
              <Card className="mb-2">
                <CardHeader>
                  <h4 className="mb-0 text-info card-title">
                    <strong>
                      Main
                    </strong>
                  </h4>
                </CardHeader>
                <CardBody>
                  <Field
                    type="text"
                    name="firstName"
                    disabled={disabled}
                    placeholder="First Name" required component={InputField}
                    label={<strong className="required">First Name </strong>}
                  />
                  <Field
                    type="text"
                    name="middleName"
                    disabled={disabled}
                    component={InputField}
                    placeholder="Middle Name"
                    label={<strong>Middle Name </strong>}
                  />
                  <Field
                    required
                    type="text"
                    name="lastName"
                    disabled={disabled}
                    component={InputField}
                    placeholder="Last Name"
                    label={<strong className="required">Last Name </strong>}
                  />
                  <Field
                    name="suffix"
                    component={Select}
                    disabled={disabled}
                    placeholder="Suffix"
                    options={suffixSelectOptions}
                    label={<strong>Suffix </strong>}
                    postprocessValue={({ name }) => name}
                    preprocessValue={name => suffixSelectOptions.find(suffix => name === suffix.name)}
                  />
                </CardBody>
              </Card>
              <Card className="mb-2">
                <CardHeader>
                  <h4 className="mb-0 text-info card-title">
                    <strong>
                      Role
                    </strong>
                  </h4>
                </CardHeader>
                <CardBody>
                  <Field
                    isMulti
                    required
                    name="roles"
                    options={roles}
                    component={Select}
                    placeholder="Roles"
                    disabled={disabled}
                    // postprocessValue={roles => roles}
                    label={<strong className="required">Roles </strong>}
                  />
                  <FormGroup className="mb-2 mb-sm-0">
                    <Field
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      component={InputField}
                      disabled={isId || disabled}
                      label={<div className="d-flex justify-content-between">
                        <strong className="required">Email </strong>
                        <button type="button" className="p-0 btn btn-link btn-sm" disabled={!isId || disabled}>Change E-mail</button>
                      </div>}
                    />
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
            <Col xs="4">
              <DropZone
                title="Image"
                id="user-photo"
                label="User Photo"
                disabled={disabled}
                alt="It is a drop zone to load user photo"
                src="https://admin-dev.intelliceed.cf/static/media/def-image.ac931042.svg"
              />
            </Col>
          </Row>
        </ReduxForm>
      </div>
    </Container>;
    <div className="px-3 py-2 text-right">
      <button disabled={disabled} type="button" className="btn btn-success" onClick={() => dispatch(submit('UserEdit'))}>
        Save
      </button>
    </div>
  </div>;
}

export default UserEdit;
