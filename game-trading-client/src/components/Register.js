import React from 'react';
import { useFormik } from 'formik';

function Register() {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            fetch('http://localhost:5555/register', { 
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
                if (data.message) {
                    alert(data.message);
                } else {
                    alert("Registration successful.");
                }
            })
            .catch(error => {
                console.error("Error during registration:", error);
                alert("Registration failed. Please try again.");
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

            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords must match';
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
            <div>
                <label>Confirm Password</label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div>{formik.errors.confirmPassword}</div>
                ) : null}
            </div>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
