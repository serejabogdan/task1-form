// outsource dependencies
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Field, submit } from 'redux-form';
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Label, Row } from 'reactstrap';

// local dependencies
import { selector, TYPE } from './reduce';
import Select from '../../../components/select';
import DropZone from '../../../components/drop-zone';
import { ReduxForm } from '../../../utils/redux-form';
import InputField from '../../../components/input-field';
import { roleSelectOptions, suffixSelectOptions } from '../../../constants/select-options';

function UserEdit ({ match }) {
  const { user } = useSelector(selector);
  const dispatch = useDispatch();
  const handleSubmit = useCallback((value) => { console.log(value); }, []);

  function firstNameValidation (firstName, MAX_CHARACTERS) {
    if (!firstName) {
      return 'First name is required';
    } else if (firstName.length > MAX_CHARACTERS) {
      return `Maximum ${MAX_CHARACTERS} characters`;
    }
  }

  function lastNameValidation (lastName, MAX_CHARACTERS) {
    if (!lastName) {
      return 'Last name is required';
    } else if (lastName.length > MAX_CHARACTERS) {
      return `Last ${MAX_CHARACTERS} characters`;
    }
  }

  function rolesValidation (roles) {
    if (!roles?.length) {
      return 'Roles are required';
    }
  }

  function formValidation (values) {
    const errors = {};
    // const isEmailRegEx = (value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    const MAX_CHARACTERS = 30;

    errors.firstName = firstNameValidation(values.firstName, MAX_CHARACTERS);
    errors.lastName = lastNameValidation(values.lastName, MAX_CHARACTERS);
    errors.roles = rolesValidation(values.roles);

    return errors;
  }

  useEffect(() => {
    dispatch({ type: TYPE.INITIALIZE, payload: { userId: match?.params?.id } });
  }, [dispatch, match?.params?.id]);

  return <div className="content d-flex flex-column overflow-hidden vh-100">
    <header className="p-3 d-flex justify-content-between">
      <h2 className="text-info mb-0">User edit page</h2>
      <Col xs="4" className="text-right">
        <button type="button" className="btn btn-danger">Delete User</button>
      </Col>
    </header>
    <Container fluid className="flex-grow-1 overflow-hidden mb-3">
      <div className="mb-3" style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
        <div style={{ position: 'absolute', overflow: 'scroll', inset: '0px', marginRight: '-19px', marginBottom: '-19px' }}>
          <ReduxForm form="UserEdit" onSubmit={handleSubmit} validate={formValidation} enableReinitialize={true} initialValues={user}>
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
                    <Field type="text" name="firstName" id="firstname" label="First Name" placeholder="First Name" required component={InputField}/>
                    <Field type="text" name="middleName" id="middleName" label="Middle Name" component={InputField}/>
                    <Field type="text" name="lastName" id="lastName" label="Last Name" required component={InputField}/>
                    <Field type="text" name="suffix" id="suffix" label="Suffix" placeholder="Suffix" options={suffixSelectOptions} component={Select}/>
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
                    <Field type="text" name="roles" id="roles" label="Roles" options={roleSelectOptions} isMulti required component={Select}/>
                    <FormGroup className="mb-2 mb-sm-0">
                      <Label for="email" className="d-flex justify-content-between">
                        <strong className="required">
                          Email { ' ' }
                        </strong>
                        <button className="p-0 btn btn-link btn-sm">Change E-mail</button>
                      </Label>
                      <Field disabled type="email" name="email" id="email" component={InputField}/>
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="4">
                <DropZone
                  title="Image"
                  id="user-photo"
                  label="User Photo"
                  alt="It is a drop zone to load user photo"
                  src="https://admin-dev.intelliceed.cf/static/media/def-image.ac931042.svg"
                />
              </Col>
            </Row>
          </ReduxForm>
        </div>
      </div>
    </Container>
    <div className="px-3 py-2 text-right">
      <button type="button" className="btn btn-success" onClick={() => dispatch(submit('UserEdit'))}>
        Save
      </button>
    </div>
  </div>;
}

UserEdit.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserEdit;
