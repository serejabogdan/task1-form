// outsource dependencies
import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Row } from 'reactstrap';

// local dependencies
import Select from '../select';
import DropZone from '../drop-zone';
import InputField from '../input-field';
import { selector } from '../../pages/reducer';
import { ReduxForm } from '../../utils/redux-form';
import { suffixSelectOptions } from '../../constants/select-options';

function UserForm ({ form, handleSubmit, initialValues, isUserId, disabled }) {
  const { roles } = useSelector(selector);

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

  return <Container fluid className="flex-grow-1 mb-3">
    <div className="mb-3">
      <div>
        <ReduxForm
          form={form}
          enableReinitialize
          onSubmit={handleSubmit}
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
                    preprocessValue={(name) => suffixSelectOptions.find(suffix => name === suffix.name)}
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
                    preprocessValue={selectRoles => selectRoles}
                    postprocessValue={roles => roles.map(role => role)}
                    label={<strong className="required">Roles </strong>}
                  />
                  <FormGroup className="mb-2 mb-sm-0">
                    <Field
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      component={InputField}
                      disabled={isUserId || disabled}
                      label={<div className="d-flex justify-content-between">
                        <strong className="required">Email </strong>
                        <button type="button" className="p-0 btn btn-link btn-sm" disabled={!isUserId || disabled}>Change E-mail</button>
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
    </div>
  </Container>;
}

UserForm.defaultProps = {
  disabled: false,
  initialValues: null,
};

UserForm.propTypes = {
  disabled: PropTypes.bool,
  isUserId: PropTypes.bool.isRequired,
  initialValues: PropTypes.object,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default UserForm;
