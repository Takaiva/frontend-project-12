import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField.jsx';
import * as yup from 'yup';
import '../styles/SignIn.scss';

export const SignInForm = () => {
    const validate = yup.object({
        username: yup.string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be 20 characters or less')
            .required('Username is required'),
        password: yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    })
    return (
        <Formik
        initialValues={{
            username: '',
            password: '',
        }}
        validationSchema={validate}
        onSubmit={(values) => {
            console.log(values);
        }}
        >
            {(formik) => (
                <div className="card shadow">
                    <div className="card-body row p-5">
                    <h1 className="my-4 text-center">Sign In</h1>
                    <Form className="col-12 col-md-0 mt-3 mt-mb-0">
                        <TextField label={"Username"} name={"username"} autoComplete={'username'}/>
                        <TextField label={"Password"} name={"password"} autoComplete={'current-password'}/>
                        <button
                            className="w-100 mb-3 pb-3 pt-3 btn btn-outline-primary shadow-sm"
                            type="submit" style={{ "borderRadius": "15px", "lineHeight": "1rem", "fontSize": "1.5rem"}}
                        >
                            Submit
                        </button>
                    </Form>
                    </div>
                    <div className="card-footer p-4" style={{"borderRadius": "0px 0px 10px 25px"}}>
                        <div className="text-center">
                            <span>New here? </span>
                            <a href="/signup">Get a pass to the station.</a>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
}
