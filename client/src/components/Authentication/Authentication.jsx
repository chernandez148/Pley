import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Col, Container } from 'react-bootstrap';
import VideoContainer from '../VideoContainer/VideoContainer';
import * as yup from 'yup';
import './Authentication.css'

function Authentication({ updateUser }) {
    const [signUp, setSignUp] = useState(false);
    const history = useHistory();

    const handleClick = () => setSignUp((signUp) => !signUp);

    const formSchema = yup.object().shape({
        fname: yup.string().required('Please enter your first name'),
        lname: yup.string().required('Please enter your last name'),
        type: yup.string().required('Please enter account type'),
        email: yup.string().email().required('Please enter your email'),
        password: yup.string().required('Please enter a password')
    });

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            type: '',
            email: '',
            password: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(signUp ? '/signup' : '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, password: values.password }, null, 2),
            }).then((resp) => {
                if (resp.ok) {
                    resp.json().then((user) => {
                        updateUser(user);
                        if (values.type === 'User') {
                            history.push('/');
                        } else if (values.type === 'Business') {
                            history.push('/');
                        }
                    });
                } else {
                    resp.json().then(console.log);
                }
            });
        },
    });

    return (
        <div className="Authentication">
            <Container fluid className='p-0'>
                <VideoContainer />
                <Col className='left-col vh-100 d-flex flex-column position-absolute justify-content-center end-0 top-0 p-5'>
                    <form>
                        <h3>{signUp ? 'Sign up now!' : 'Please sign in'}</h3>
                        {signUp && formik.errors && (
                            <>
                                <label htmlFor='fname'>First Name</label>
                                <input
                                    type='text'
                                    id='fname'
                                    name='fname'
                                    onChange={formik.handleChange}
                                    value={formik.values.fname}
                                />
                                <span>{formik.errors.fname}</span>
                                <label htmlFor='lname'>Last Name</label>
                                <input
                                    type='text'
                                    id='lname'
                                    name='lname'
                                    onChange={formik.handleChange}
                                    value={formik.values.lname}
                                />
                                <span>{formik.errors.lname}</span>
                                <label>Account type:</label>
                                <label className='mt-0'>
                                    <input
                                        type='radio'
                                        id='user'
                                        name='type'
                                        value='User'
                                        onChange={formik.handleChange}
                                        checked={formik.values.type === 'User'}
                                    />
                                    User
                                </label>
                                <label className='mt-0'>
                                    <input
                                        type='radio'
                                        id='business'
                                        name='type'
                                        value='Business'
                                        onChange={formik.handleChange}
                                        checked={formik.values.type === 'Business'}
                                    />
                                    Business
                                </label>
                                <span>{formik.errors.type}</span>
                            </>
                        )}
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <span>{formik.errors.email}</span>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <span>{formik.errors.password}</span>
                        <button type='submit' onClick={formik.handleSubmit}>
                            {signUp ? 'Sign up now!' : 'Sign in'}
                        </button>
                    </form>

                    <h6 className='mt-3'>{signUp ? 'Already a member?' : 'Not a member?'}</h6>

                    <a href='#' onClick={handleClick}>{signUp ? 'Log In!' : 'Sign Up!'}</a>
                </Col>
            </Container>
        </div>
    );
}

export default Authentication
