import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';

import {
  Button,
  Card,
  Form,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

import * as yup from 'yup';
import axios from 'axios';

import { useAuth } from '../hooks';

import SignUpInputField from './SignUpInputField.jsx';
import routes from '../routes.js';

function SignUpPage() {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const [regIsFailed, setRegIsFailed] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();
  const { logIn } = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .trim()
        .required(t('signup.errors.username'))
        .min(3, t('signup.errors.usernameMinLength'))
        .max(20, t('signup.errors.usernameMaxLength')),
      password: yup
        .string()
        .trim()
        .required(t('signup.errors.password'))
        .min(6, t('signup.errors.passwordMinLength')),
      confirmPassword: yup
        .string()
        .test('confirmPassword', t('signup.errors.confirm'), (value, context) => value === context.parent.password),
    }),
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const response = await axios.post(
          routes.registrationPath(),
          { username: values.username, password: values.password },
        );
        logIn(response.data);
        actions.setSubmitting(false);
        navigate(routes.chatPagePath());
        toast.success(t('notifications.authSuccess', { username: response.data.username }));
        rollbar.info(`${response.data.username} logged in`);
      } catch (err) {
        if (!err.isAxiosError) {
          toast.error(t('errors.unknown'));
          throw err;
        }
        if (err.response.status === 409) {
          setRegIsFailed(true);
          inputRef.current.select();
        } else {
          toast.error(t('errors.network'));
          throw err;
        }
        actions.setSubmitting(false);
      }
    },
  });
  return (
    <Container
      className="h-100"
      fluid
      id="wallpaper"
    >
      <Row className="h-100 justify-content-center align-content-center">
        <Col
          className="col-12"
          md="8"
          xxl="6"
        >
          <Card className="shadow">
            <Card.Body className="row p-5">
              <h1 className="my-4 text-center">
                {t('signup.header')}
              </h1>

              <Form
                className="col-12 col-md-0 mt-3 mt-mb-0"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <SignUpInputField
                  formik={formik}
                  inputRef={inputRef}
                  label={t('signup.username')}
                  name="username"
                  regIsFailed={regIsFailed}
                />

                <SignUpInputField
                  formik={formik}
                  label={t('signup.password')}
                  name="password"
                  regIsFailed={regIsFailed}
                  type="password"
                />

                <SignUpInputField
                  formik={formik}
                  label={t('signup.confirm')}
                  name="confirmPassword"
                  regIsFailed={regIsFailed}
                  type="password"
                />

                <Button
                  className="w-100 mb-3 pb-3 pt-3 shadow-sm"
                  disabled={formik.isSubmitting}
                  style={{
                    borderRadius: '15px',
                    lineHeight: '1rem',
                    fontSize: '1.5rem',
                    border: '1.5px solid',
                  }}
                  type="submit"
                  variant="outline-primary"
                >
                  {t('signup.submitButton')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>

  );
}

export default SignUpPage;
