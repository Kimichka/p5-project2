import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required'),
});

const Register = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        axios.post('/register', values)
          .then(response => {
            // Handle success
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
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
