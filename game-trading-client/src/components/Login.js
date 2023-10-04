import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const Login = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={values => {
        axios.post('/login', values)
          .then(response => {
            if(response.data.success) {
              // Handle successful login
            } else {
              // Handle login failure
            }
          })
          .catch(error => {
            // Handle error
          });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="username" />
          {errors.username && touched.username ? <div>{errors.username}</div> : null}
          <Field name="password" type="password" />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <button type="submit">Login</button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
