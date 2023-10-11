import React from 'react';
import { useFormik } from 'formik';

const styles = {
    form: {
        width: '300px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: 'black',
        color: 'white',
    },
    input: {
        width: '100%',
        fontSize: '1.2rem',
        marginBottom: '10px',
        padding: '8px',
        border: 'none',
        borderRadius: '4px',
    },
    select: {
        width: '100%',
        fontSize: '1.2rem',
        marginBottom: '10px',
        padding: '8px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: 'black',
        color: 'white',
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
    error: {
        color: 'red',
    },
};

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
        <form style={styles.form} onSubmit={formik.handleSubmit}>
            <div>
                <input
                    name="title"
                    type="text"
                    placeholder="Game Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    style={styles.input}
                />
                {formik.errors.title ? <div style={styles.error}>{formik.errors.title}</div> : null}
            </div>

            <div>
                <input
                    name="description"
                    type="text"
                    placeholder="Game Description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    style={styles.input}
                />
                {formik.errors.description ? <div style={styles.error}>{formik.errors.description}</div> : null}
            </div>

            <div>
                <select
                    name="console"
                    onChange={formik.handleChange}
                    value={formik.values.console}
                    style={styles.select}
                >
                    <option value="" label="Select console" />
                    <option value="xbox" label="Xbox" />
                    <option value="ps5" label="PS5" />
                </select>
                {formik.errors.console ? <div style={styles.error}>{formik.errors.console}</div> : null}
            </div>

            <div>
                <button
                    type="submit"
                    style={{ ...styles.button, ...styles.buttonHover }}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default GameForm;
