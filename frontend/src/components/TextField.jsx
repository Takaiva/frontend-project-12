import React from 'react';
import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    console.log(field);
    //const borderClass = meta.touched && meta.error ? 'is-invalid' : 'border-dark';
    return (
        <div className="mb-3 form-floating">
            <input
                id={field.name}
                placeholder={label}
                className={`form-control shadow-sm ${meta.touched && meta.error && 'is-invalid'}`}
                style={{ "borderRadius": "5px 15px 5px 15px" }}
                {...field} {...props}
            />
            <label htmlFor={field.name}>{label}</label>
            <ErrorMessage component="div" name={field.name} className="invalid-tooltip" />
        </div>
    )
}
