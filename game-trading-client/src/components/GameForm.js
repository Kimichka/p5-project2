
import React from 'react';
import { useFormik } from 'formik';

function GameForm(props) {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            console: ''
        },
        onSubmit: values => {
            onSubmitHandler(values);
        },
        validate: values => {
            let errors = {};

            if (!values.title) {
                errors.title = 'Required';
            }

            if (!values.description) {
                errors.description = 'Required';
            }

            if (!values.console) {
                errors.console = 'Required';
            }

            return errors;
        }
    });

    const onSubmitHandler = async (values) => {
        try {
            const response = await fetch('http://localhost:5555/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            props.onSuccess();  
        } catch (error) {
            console.error('There was a problem with the post operation:', error.message);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            
        </form>
    );
}

export default GameForm;
