import { Form, FloatingLabel } from "react-bootstrap";
import React from "react";

export const LoginInputField = ({ formik, label, name, inputRef = null, authIsFailed, ...props }) => {

    const isInvalid = (formik.touched[name] && formik.errors[name]) || authIsFailed;
    const authRejected = name === 'password' ?
        <Form.Control.Feedback type="invalid">There is no such account</Form.Control.Feedback> : null;
    const feedback = formik.errors[name] ?
        <Form.Control.Feedback type="invalid">{formik.errors[name]}</Form.Control.Feedback> : authRejected;
    return (
        <FloatingLabel label={label} controlId={name} className="mb-3">
            <Form.Control
                {...props}
                className={`shadow-sm ${isInvalid ? '' : 'border-dark'}`}
                type={name === 'password' ? 'password' : null }
                name={name}
                placeholder={label}
                ref={inputRef}
                value={formik.values[name]}
                onChange={formik.handleChange}
                isInvalid={isInvalid}
                style={{ "borderRadius": "5px 15px 5px 15px" }}
                required
            />
            {feedback}
        </FloatingLabel>
    );
};
