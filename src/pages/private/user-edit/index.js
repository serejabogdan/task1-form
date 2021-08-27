// outsource dependencies
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Field, submit } from 'redux-form';
import { Card, CardBody, CardHeader } from 'reactstrap';

// local dependencies
import { ReduxForm } from '../../../utils/redux-form';
import InputField from '../../../components/input-field';
import { roles } from '../../../constants/select-options';
import MultiSelect from '../../../components/multi-select';

function UserEdit () {
  const dispatch = useDispatch();

  const handleSubmit = useCallback((value) => { console.log(value); }, []);

  return <div className="content d-flex flex-column overflow-hidden vh-100">
    <div className="p-3 d-flex justify-content-between">
      <h2 className="text-info mb-0">User edit page</h2>
      <div className="text-right col-4">
        <button type="button" className="btn btn-danger"> Delete User</button>
      </div>
    </div>
    <div className="container-fluid flex-grow-1 overflow-hidden mb-3">
      <div className="mb-3" style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
        <div style={{ position: 'absolute', overflow: 'scroll', inset: '0px', marginRight: '-19px', marginBottom: '-19px' }}>
          <ReduxForm form="UserEdit" onSubmit={handleSubmit}>
            <div className="row w-100">
              <div className="col-8">
                <Card className="mb-2">
                  <CardHeader>
                    <h4 className="mb-0 text-info card-title">
                      <strong>
                      Main
                      </strong>
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <Field type="text" name="firstName" id="firstname" label="First Name" component={InputField}/>
                    <Field type="text" name="middleName" id="middleName" label="Middle Name" component={InputField}/>
                    <Field type="text" name="lastName" id="lastName" label="Last Name" component={InputField}/>
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
                    <Field type="text" name="select" id="select" label="Multi Select" options={roles} component={MultiSelect}/>
                  </CardBody>
                </Card>
              </div>
              <div className="col-4">
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
              </div>
            </div>
          </ReduxForm>
        </div>
      </div>
    </div>
    <div className="px-3 py-2 text-right">
      <button type="button" className="btn btn-success" onClick={() => dispatch(submit('UserEdit'))}>Save</button>
    </div>
  </div>;
}

export default UserEdit;
