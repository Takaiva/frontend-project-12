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

import { SignInInputField } from "./SignInInputField.jsx";
import routes from '../routes.js';

const SignUpPage = () => {
    const [authIsFailed, setAuthIsFailed] = useState(false);
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
                .min(3, 'Username must be at least 3 characters')
                .max(20, 'Username must be 20 characters or less')
                .required('Username is required'),
            password: yup.string()
                .min(5, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            //const response = await axios.post(routes.loginPath(), values);
            //localStorage.setItem('user', JSON.stringify(response.data));
            //setAuthIsFailed(false);
            console.log(values);

        }
    })
    return (
        <Card className="card shadow">
            <Card.Body className="row p-5">
                <h1 className="my-4 text-center">Sign In</h1>
                <Form
                    onSubmit={formik.handleSubmit}
                    className="col-12 col-md-0 mt-3 mt-mb-0"
                >
                    <SignInInputField formik={formik} label="Username" name="username" inputRef={inputRef} authIsFailed={authIsFailed} />
                    <SignInInputField formik={formik} label="Password" name="password" authIsFailed={authIsFailed} />
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
