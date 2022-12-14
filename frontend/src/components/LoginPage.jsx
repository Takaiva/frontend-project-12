import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';

import {
  Button, Card, Form, Row, Col, Container,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import axios from 'axios';

import { useAuth } from '../hooks';
import routes from '../routes.js';

import LoginInputField from './LoginInputField.jsx';

function LoginPage() {
  const { t } = useTranslation();
  const [authIsFailed, setAuthIsFailed] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required(t('login.errors.username')),
      password: yup.string()
        .required(t('login.errors.password')),
    }),
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const response = await axios.post(routes.loginPath(), values);
        logIn(response.data);
        setAuthIsFailed(false);
        actions.setSubmitting(false);
        navigate(routes.chatPagePath());
        toast.success(t('notifications.authSuccess', { username: response.data.username }));
        rollbar.info(`${response.data.username} logged in`);
      } catch (err) {
        if (!err.isAxiosError) {
          toast.error(t('errors.unknown'));
          throw err;
        }
        if (err.response?.status === 401) {
          setAuthIsFailed(true);
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
              <h1 className="mb-4 text-center">
                {t('login.header')}
              </h1>

              <Form
                className="col-12 col-md-0 mt-3 mt-mb-0"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <LoginInputField
                  authIsFailed={authIsFailed}
                  formik={formik}
                  inputRef={inputRef}
                  label={t('login.username')}
                  name="username"
                />

                <LoginInputField
                  authIsFailed={authIsFailed}
                  formik={formik}
                  label={t('login.password')}
                  name="password"
                />

                <Button
                  className="w-100 mb-3 mt-4 pb-3 pt-3 shadow-sm"
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
                  {t('login.submitButton')}
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer
              className="p-4"
              style={{ borderRadius: '0px 0px 10px 25px' }}
            >
              <div className="text-center">
                <span>
                  {t('login.newToChat')}
                </span>

                <Link to={routes.registrationPagePath()}>
                  {t('login.signup')}
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
