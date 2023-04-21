import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';

import './Navigation.css'


function Navigation({ setHideOverflow }) {

    const handleOverflow = () => {
        setHideOverflow(true)
    }

    return (
        <Container fluid className='Navigation p-4 position-sticky top-0'>
            <Row className='align-items-center'>
                <Col><h4 className='text-dark'><a href="/hero">Logo</a></h4></Col>
                <Col>
                    <Form className='search-form d-flex flex-row'>
                        <input className='w-100 ps-3' placeholder='True Foods' type="search" />
                        <input className='w-100 ps-3' placeholder='Irvine' type="search" />
                        <button className='m-0'><IoIosSearch /></button>
                    </Form>
                </Col>
                <Col>
                    <Link onClick={handleOverflow} className='me-5' to="/Authentication">Log In</Link>
                    <Link to="/SignUp">Sign Up</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Navigation;
