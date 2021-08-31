// outsource dependencies
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Field, submit } from 'redux-form';
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';

// local dependencies
import { ReduxForm } from '../../../utils/redux-form';
import InputField from '../../../components/input-field';
import MultiSelect from '../../../components/multi-select';
import { roleSelectOptions } from '../../../constants/select-options';

function UserEdit () {
  const dispatch = useDispatch();

  const handleSubmit = useCallback((value) => { console.log(value); }, []);

  return <div className="content d-flex flex-column overflow-hidden vh-100">
    <header className="p-3 d-flex justify-content-between">
      <h2 className="text-info mb-0">User edit page</h2>
      <Col xs="4" className="text-right">
        <button type="button" className="btn btn-danger"> Delete User</button>
      </Col>
    </header>
    <Container fluid className="flex-grow-1 overflow-hidden mb-3">
      <div className="mb-3" style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
        <div style={{ position: 'absolute', overflow: 'scroll', inset: '0px', marginRight: '-19px', marginBottom: '-19px' }}>
          <ReduxForm form="UserEdit" onSubmit={handleSubmit}>
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
                    <Field type="text" name="firstName" id="firstname" label="First Name" required component={InputField}/>
                    <Field type="text" name="middleName" id="middleName" label="Middle Name" component={InputField}/>
                    <Field type="text" name="lastName" id="lastName" label="Last Name" required component={InputField}/>
                    <Field type="text" name="suffix" id="suffix" label="Suffix" component={InputField}/>
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
                    <Field type="text" name="roles" id="roles" label="Roles" options={roleSelectOptions} required component={MultiSelect}/>
                    <FormGroup className="mb-2 mb-sm-0">
                      <Label for="email" className="d-flex justify-content-between">
                        <strong>
                          Email
                        </strong>
                        <button className="p-0 btn btn-link btn-sm">Change E-mail</button>
                      </Label>
                      <Input disabled type="email" name="email" id="email" placeholder="something@idk.cool" />
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="4">
                <Card className="mb-2">
                  <CardHeader>
                    <h4 className="mb-0 text-info card-title">
                      <strong>
                        Image
                      </strong>
                    </h4>
                  </CardHeader>
                  <CardBody>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ReduxForm>
        </div>
      </div>
    </Container>
    <div className="px-3 py-2 text-right">
      <button type="button" className="btn btn-success" onClick={() => dispatch(submit('UserEdit'))}>Save</button>
    </div>
  </div>;
}

export default UserEdit;
