import { Form, FloatingLabel } from "react-bootstrap";
import React from "react";

export const SignInInputField = ({ formik, label, name, inputRef = null, authIsFailed }) => {
    return (
        <FloatingLabel label={label} controlId={name} className="mb-3">
            <Form.Control
                className='shadow-sm'
                name={name}
                placeholder={label}
                ref={inputRef}
                value={formik.values[name]}
                onChange={formik.handleChange}
                isInvalid={(formik.touched[name] && formik.errors[name]) || authIsFailed}
                style={{ "borderRadius": "5px 15px 5px 15px" }}
                required
            />
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                {formik.errors[name] ? formik.errors[name] : null}
            </Form.Control.Feedback>
        </FloatingLabel>
    );
}
