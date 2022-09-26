import { Form, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import React from 'react';

function SignUpInputField({
  formik, label, name, inputRef = null, regIsFailed, type,
}) {
  const { t } = useTranslation();

  const isInvalid = (formik.touched[name] && formik.errors[name]) || regIsFailed;
  const isConflict = name === 'confirmPassword' ? t('signup.errors.alreadyExists') : null;

  return (
    <FloatingLabel
      className="mb-3"
      controlId={name}
      label={label}
    >
      <Form.Control
        className={`shadow-sm ${isInvalid ? '' : 'border-dark'}`}
        autoComplete={name === 'username' ? 'username' : 'current-password'}
        isInvalid={isInvalid}
        name={name}
        type={type}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        placeholder={label}
        ref={inputRef}
        required
        style={{ borderRadius: '5px 15px 5px 15px' }}
        value={formik.values[name]}
      />

      <Form.Control.Feedback type="invalid">
        {formik.errors[name] ? formik.errors[name] : isConflict}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

export default SignUpInputField;
