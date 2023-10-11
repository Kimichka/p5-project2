import React from 'react';
import { useFormik } from 'formik';
import LogoutButton from './LogoutButton';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',  
        fontFamily: 'cute-font',  
        fontSize: '1.5rem',  
        textAlign: 'center',
        backgroundColor: 'black', 
    },
    form: {
        width: '300px',  
        padding: '20px',  
        borderRadius: '8px',  
        
    },
    input: {
        width: '100%',
        fontSize: '1.2rem',  
        marginBottom: '10px',  
        padding: '8px',  
        border: 'none',  
        borderRadius: '4px', 
       
    },
    label: {
        fontWeight: 'bold',
        color: 'skyblue',  
    },
    error: {
        color: 'red', 
    },
    button: {
        marginTop: '10px',  
        fontSize: '1.2rem',  
        padding: '10px 20px', 
        border: 'none',  
        borderRadius: '4px', 
        cursor: 'pointer', 
        transition: 'background-color 0.3s',  
    },
    buttonHover: {
        backgroundColor: 'skyblue',  
    },
};

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
        <div style={styles.container}>
            <form style={styles.form} onSubmit={formik.handleSubmit}>
                <div>
                    <label style={styles.label}>Username</label>
                    <input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        style={styles.input}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div style={styles.error}>{formik.errors.username}</div>
                    ) : null}
                </div>
                <div>
                    <label style={styles.label}>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        style={styles.input}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={styles.error}>{formik.errors.password}</div>
                    ) : null}
                </div>
                <button
                    type="submit"
                    style={{ ...styles.button, ...styles.buttonHover }}
                >
                    Login
                </button>
            </form>

            <LogoutButton />
        </div>
    );
}

export default Login;
