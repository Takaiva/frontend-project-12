import { Form, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import React from 'react';

function LoginInputField({
  formik, label, name, inputRef = null, authIsFailed,
}) {
  const { t } = useTranslation();
  const isInvalid = authIsFailed;

  const authRejected = name === 'password'
    ? (
      <Form.Control.Feedback type="invalid">
        {t('login.errors.authFailed')}
      </Form.Control.Feedback>
    ) : null;
  const feedback = formik.errors[name]
    ? (
      <Form.Control.Feedback type="invalid">
        {formik.errors[name]}
      </Form.Control.Feedback>
    ) : authRejected;

  return (
    <FloatingLabel
      className="mb-3"
      controlId={name}
      label={label}
    >
      <Form.Control
        className={`shadow-sm ${isInvalid ? '' : 'border-dark'}`}
        isInvalid={authIsFailed}
        name={name}
        onChange={formik.handleChange}
        placeholder={label}
        ref={inputRef}
        required
        style={{ borderRadius: '5px 15px 5px 15px' }}
        type={name === 'password' ? 'password' : null}
        value={formik.values[name]}
      />

      {feedback}
    </FloatingLabel>
  );
}

export default LoginInputField;
