
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
            <div>
                <input 
                    name="title"
                    type="text"
                    placeholder="Game Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                {formik.errors.title ? <div>{formik.errors.title}</div> : null}
            </div>

            <div>
                <input 
                    name="description"
                    type="text"
                    placeholder="Game Description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
                {formik.errors.description ? <div>{formik.errors.description}</div> : null}
            </div>

            <div>
                <select 
                    name="console"
                    onChange={formik.handleChange}
                    value={formik.values.console}
                >
                    <option value="" label="Select console" />
                    <option value="xbox" label="Xbox" />
                    <option value="ps5" label="PS5" />
                </select>
                {formik.errors.console ? <div>{formik.errors.console}</div> : null}
            </div>

            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default GameForm;
