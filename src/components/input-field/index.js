import React from 'react';
import {Input, Label} from "reactstrap";

function InputField ({input, type, id, label, meta: {touched, warning, error}, ...props}) {
    const errorMessage = <span>{error}</span>
    const hasError = touched && ((error && errorMessage) || (warning && errorMessage));
    return (
        <div>
            <Label for={id}>{label}</Label>
            <Input type={type} id={id} placeholder={label} {...input}/>
            {hasError}
        </div>
    );
}

export default InputField;