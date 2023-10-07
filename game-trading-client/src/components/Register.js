import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .required('Required')
});

const Register = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();

    const handleRegistration = async (values) => {
        try {
            const response = await axios.post('/register', values);
            if (response.status === 201) {
                history.push('/login');
            }
        } catch (error) {
           
            setErrorMessage("Registration failed!");
        }
    };

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={RegistrationSchema}
            onSubmit={handleRegistration}
        >
            {() => (
                <Form>
                    <div>
                        <label>Username:</label>
                        <Field name="username" />
                        <ErrorMessage name="username" component="div" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <button type="submit">Register</button>
                    {errorMessage && <div>{errorMessage}</div>}
                </Form>
            )}
        </Formik>
    );
};

export default Register;
