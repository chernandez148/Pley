import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';

import './Navigation.css'


function Navigation({ user, updateUser }) {
    const history = useHistory()

    console.log(user)


    const logout = () => {
        fetch("/logout", {
            method: "DELETE",
        }).then(res => {
            if (res.ok) {
                updateUser(null)
                history.push('/authentication')
            }
        })
    }

    return (
        <Container fluid className='Navigation p-4 position-sticky top-0'>
            <Row className='align-items-center'>
                <Col><h4 className='text-dark'><Link to="/hero">Logo</Link></h4></Col>
                <Col>
                    <Form className='search-form d-flex flex-row'>
                        <input className='w-100 ps-3' placeholder='True Foods' type="search" />
                        <input className='w-100 ps-3' placeholder='Irvine' type="search" />
                        <button className='m-0'><IoIosSearch /></button>
                    </Form>
                </Col>
                <Col className='d-flex align-items-center'>
                    {!user ? <Link className='me-5' to="/Authentication">Log In</Link> : <h6 className='m-0'>Hello, {user.fname}</h6>}
                    {!user ? <Link className='me-5' to="/Authentication">Sign Up</Link> : <FiLogOut onClick={logout} />}
                </Col>
            </Row>
        </Container>
    );
}

export default Navigation;
