// outsource dependencies
import React, { useMemo } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Label, Row } from 'reactstrap';

// local dependencies
import Select from '../select';
import DropZone from '../drop-zone';
import InputField from '../input-field';
import { ReduxForm } from '../../utils/redux-form';
import { selector } from '../../pages/reducer';
import { suffixSelectOptions } from '../../constants/select-options';

function UserForm ({ form, handleSubmit, initialValues, isUserCreationForm }) {
  const { roles } = useSelector(selector);
  function firstNameValidation (value, MAX_CHARACTERS) {
    if (!value) {
      return 'First name is required';
    } else if (value.length > MAX_CHARACTERS) {
      return `Maximum ${MAX_CHARACTERS} characters`;
    } else if (!/\w/.test(value)) {
      return 'Latin alphabet only';
    }
  }

  function lastNameValidation (value, MAX_CHARACTERS) {
    if (!value) {
      return 'Last name is required';
    } else if (value.length > MAX_CHARACTERS) {
      return `Last ${MAX_CHARACTERS} characters`;
    } else if (!/\w/.test(value)) {
      return 'Latin alphabet only';
    }
  }

  function rolesValidation (value) {
    if (!value?.length) {
      return 'Roles are required';
    }
  }

  function emailValidation (value) {
    const isEmailRegEx = (value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

    if (!value) {
      return 'Email is required';
    } else if (isEmailRegEx(value)) {
      return 'Invalid email address';
    }
  }

  function formValidation (values) {
    const errors = {};
    const MAX_CHARACTERS = 30;

    errors.firstName = firstNameValidation(values.firstName, MAX_CHARACTERS);
    errors.lastName = lastNameValidation(values.lastName, MAX_CHARACTERS);
    errors.roles = rolesValidation(values.roles);
    errors.email = emailValidation(values.email);

    return errors;
  }

  const selectRolesOptions = useMemo(() => roles.map(role => ({ value: role.name, label: role.name })), [roles]);

  return <Container fluid className="flex-grow-1 overflow-hidden mb-3">
    <div className="mb-3">
      <div>
        <ReduxForm
          form={form}
          onSubmit={handleSubmit}
          enableReinitialize
          validate={formValidation}
          initialValues={initialValues}
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
                  <Field type="text" name="firstName" label="First Name" placeholder="First Name" required component={InputField} />
                  <Field type="text" name="middleName" label="Middle Name" component={InputField} />
                  <Field type="text" name="lastName" label="Last Name" required component={InputField} />
                  <Field type="text" name="suffix" label="Suffix" placeholder="Suffix" options={suffixSelectOptions} component={Select} />
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
                  <Field type="text" name="roles" label="Roles" options={selectRolesOptions} isMulti required component={Select} />
                  <FormGroup className="mb-2 mb-sm-0">
                    <Field type="email" name="email" label="Email" disabled={!isUserCreationForm} required component={InputField}>
                      <Label htmlFor="email" className="w-100">
                        <div className="d-flex justify-content-between">
                          <strong className="required">
                            Email { ' ' }
                          </strong>
                          <button type="button" className="p-0 btn btn-link btn-sm" disabled={isUserCreationForm}>Change E-mail</button>
                        </div>
                      </Label>
                    </Field>
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
  </Container>;
}

UserForm.defaultProps = {
  initialValues: null,
  isUserCreationForm: false,
};

UserForm.propTypes = {
  initialValues: PropTypes.object,
  form: PropTypes.string.isRequired,
  isUserCreationForm: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
};

export default UserForm;
