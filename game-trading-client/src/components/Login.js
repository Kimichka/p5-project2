import React from 'react';
import { useFormik } from 'formik';

function Login() {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            fetch('http://localhost:5555/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.authenticated) {
                    alert("Login successful.");
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error("Error during login:", error);
                alert("Login failed. Please try again.");
            });
        },
        validate: values => {
            let errors = {};

            if (!values.username) {
                errors.username = 'Required';
            }

            if (!values.password) {
                errors.password = 'Required';
            }

            return errors;
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label>Username</label>
                <input 
                    type="text" 
                    name="username" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                ) : null}
            </div>
            <div>
                <label>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
