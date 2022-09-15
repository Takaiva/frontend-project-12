import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    Form,
    Container,
    Col,
    Row,
} from "react-bootstrap";
import * as yup from 'yup';
import axios from 'axios';

import { RegistrationInputField } from "./RegistrationInputField.jsx";
import routes from '../routes.js';
import { useAuth } from "../hooks";

const RegistrationPage = () => {
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
                .required('Username is required')
                .min(3, 'Username must be at least 3 characters')
                .max(20, 'Username must be at most 20 characters'),
            password: yup
                .string()
                .trim()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: yup
                .string()
                .test('confirmPassword', 'passwords must match', (value, context) => value === context.parent.password),
        }),
        onSubmit: async (values) => {

            try {
                const response = await axios.post(
                    routes.registrationPath(),
                    { username: values.username, password: values.password });
                logIn(response.data);
                navigate(routes.chatPagePath());
            } catch (err) {
                if (!err.isAxiosError) {
                    throw err;
                }
                if (err.response.status === 409) {
                    setRegIsFailed(true);
                    inputRef.current.select();
                    return;
                }
                throw err;
            }
        },
    })
    return (
        <Container fluid className="h-100" id="wallpaper">
            <Row className="h-100 justify-content-center align-content-center">
                <Col md="8" xxl="6" className="col-12">
                    <Card className="shadow">
                        <Card.Body className="row p-5">
                            <h1 className="my-4 text-center">Sign Up</h1>
                            <Form
                                onSubmit={formik.handleSubmit}
                                className="col-12 col-md-0 mt-3 mt-mb-0"
                                noValidate
                            >
                                <RegistrationInputField
                                    formik={formik}
                                    label="Username"
                                    name="username"
                                    inputRef={inputRef}
                                    regIsFailed={regIsFailed}
                                />
                                <RegistrationInputField
                                    formik={formik}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    regIsFailed={regIsFailed} />
                                <RegistrationInputField
                                    formik={formik}
                                    label="Confirm password"
                                    name="confirmPassword"
                                    type="password"
                                    regIsFailed={regIsFailed} />
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
                    </Card>
                </Col>
            </Row>

        </Container>

    );
};

export default RegistrationPage;
