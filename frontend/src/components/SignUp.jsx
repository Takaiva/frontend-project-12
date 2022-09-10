import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    Form,
} from "react-bootstrap";
import * as yup from 'yup';
import axios from 'axios';

import { SignUpInputField } from "./SignUpInputField.jsx";
import routes from '../routes.js';
import { useAuth } from "../hooks";

const SignUpPage = () => {
    const [regIsFailed, setRegIsFailed] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef();
    const auth = useAuth();

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
                .max(20, 'Username must be 20 characters or less'),
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
                    routes.signUpPath(),
                    { username: values.username, password: values.password });
                auth.logIn(response.data);
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
        <Card className="card shadow">
            <Card.Body className="row p-5">
                <h1 className="my-4 text-center">Sign In</h1>
                <Form
                    onSubmit={formik.handleSubmit}
                    className="col-12 col-md-0 mt-3 mt-mb-0"
                    noValidate
                >
                    <SignUpInputField
                        formik={formik}
                        label="Username"
                        name="username"
                        inputRef={inputRef}
                        regIsFailed={regIsFailed}
                    />
                    <SignUpInputField
                        formik={formik}
                        label="Password"
                        name="password"
                        type="password"
                        regIsFailed={regIsFailed} />
                    <SignUpInputField
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
            <Card.Footer className="p-4" style={{"borderRadius": "0px 0px 10px 25px"}}>
                <div className="text-center">
                    <span>New here? </span>
                    <Link to={routes.signUpPagePath()}>Get a pass to the station.</Link>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default SignUpPage;
