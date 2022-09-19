import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

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

const SignUpPage = () => {
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
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          routes.registrationPath(),
          { username: values.username, password: values.password },
        );
        logIn(response.data);
        navigate(routes.chatPagePath());
        toast.success(t('notifications.authSuccess', { username: response.data.username }));
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
      }
    },
  });
  return (
      <Container fluid className="h-100" id="wallpaper">
          <Row className="h-100 justify-content-center align-content-center">
              <Col md="8" xxl="6" className="col-12">
                  <Card className="shadow">
                      <Card.Body className="row p-5">
                          <h1 className="my-4 text-center">{t('signup.header')}</h1>
                          <Form
                                onSubmit={formik.handleSubmit}
                                className="col-12 col-md-0 mt-3 mt-mb-0"
                                noValidate
                            >
                              <SignUpInputField
                                    formik={formik}
                                    label={t('signup.username')}
                                    name="username"
                                    inputRef={inputRef}
                                    regIsFailed={regIsFailed}
                                />
                              <SignUpInputField
                                    formik={formik}
                                    label={t('signup.password')}
                                    name="password"
                                    type="password"
                                    regIsFailed={regIsFailed} />
                              <SignUpInputField
                                    formik={formik}
                                    label={t('signup.confirm')}
                                    name="confirmPassword"
                                    type="password"
                                    regIsFailed={regIsFailed} />
                              <Button
                                    variant="outline-primary"
                                    type="submit"
                                    className="w-100 mb-3 pb-3 pt-3 shadow-sm"
                                    style={{
                                      borderRadius: '15px',
                                      lineHeight: '1rem',
                                      fontSize: '1.5rem',
                                      border: '1.5px solid',
                                    }}
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
};

export default SignUpPage;
