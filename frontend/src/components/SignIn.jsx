import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Form, Row, Col, Container } from "react-bootstrap";
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

import { SignInInputField } from "./SignInInputField.jsx";
import { useAuth } from "../hooks";
import routes from '../routes.js';

const SignInPage = () => {
    const [authIsFailed, setAuthIsFailed] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const inputRef = useRef();

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
                .required('Username is required'),
            password: yup.string()
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(routes.loginPath(), values);
                auth.logIn(response.data);
                setAuthIsFailed(false);
                navigate(routes.chatPagePath());
            } catch (err) {
                if (!err.isAxiosError) {
                    toast.error('There is no such user');
                    return;
                }
                if (err.response?.status === 401) {
                    setAuthIsFailed(true);
                    inputRef.current.select();
                } else {
                    toast.error('Ошибка сети')
                }
            }

        }
    })
    return (
        <Container fluid className="h-100">
            <Row className="h-100 justify-content-center align-content-center">
                <Col md="8" xxl="6" className="col-12">
                    <Card className="card shadow">
                        <Card.Body className="row p-5">
                            <h1 className="mb-4 text-center">Sign In</h1>
                            <Form
                                onSubmit={formik.handleSubmit}
                                className="col-12 col-md-0 mt-3 mt-mb-0"
                                noValidate
                            >
                                <SignInInputField
                                    formik={formik}
                                    label="Username"
                                    name="username"
                                    inputRef={inputRef}
                                    authIsFailed={authIsFailed}
                                />
                                <SignInInputField
                                    formik={formik}
                                    label="Password"
                                    name="password"
                                    authIsFailed={authIsFailed}
                                />
                                <Button
                                    variant="outline-primary"
                                    type="submit"
                                    className="w-100 mb-3 pb-3 pt-3 shadow-sm"
                                    style={{ "borderRadius": "15px", "lineHeight": "1rem", "fontSize": "1.5rem" }}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="p-4" style={{"borderRadius": "0px 0px 10px 25px"}}>
                            <div className="text-center">
                                <span>New here? </span>
                                <Link to={routes.signUpPagePath()}>Get a pass to the station.</Link>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default  SignInPage;
