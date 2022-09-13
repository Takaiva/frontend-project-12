import { Form, FloatingLabel } from "react-bootstrap";
import React from "react";

export const RegistrationInputField = ({ formik, label, name, inputRef = null, regIsFailed, ...props }) => {

    const isInvalid = (formik.touched[name] && formik.errors[name]) || regIsFailed;
    return (
        <FloatingLabel label={label} controlId={name} className="mb-3">
            <Form.Control
                {...props}
                className={`shadow-sm ${isInvalid ? '' : 'border-dark'}`}
                name={name}
                placeholder={label}
                ref={inputRef}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={isInvalid}
                style={{ "borderRadius": "5px 15px 5px 15px" }}
                required
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors[name] ? formik.errors[name] : null}
            </Form.Control.Feedback>
        </FloatingLabel>
    );
}