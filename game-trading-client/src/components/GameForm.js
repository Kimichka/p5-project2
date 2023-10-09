
import React from 'react';
import { useFormik } from 'formik';

function GameForm() {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            console: ''
        },
        onSubmit: values => {
            
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

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label>Title</label>
                <input 
                    type="text" 
                    name="title" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                ) : null}
            </div>
            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                ></textarea>
                {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                ) : null}
            </div>
            <div>
                <label>Console</label>
                <select 
                    name="console" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.console}
                >
                    <option value="" label="Select console" />
                    <option value="PS5" label="PS5" />
                    <option value="Xbox Series X" label="Xbox Series X" />
                    <option value="Switch" label="Nintendo Switch" />
                    <option value="PC" label="PC" />
                    
                </select>
                {formik.touched.console && formik.errors.console ? (
                    <div>{formik.errors.console}</div>
                ) : null}
            </div>
            <button type="submit">Add Game</button>
        </form>
    );
}

export default GameForm;
