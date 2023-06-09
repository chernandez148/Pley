import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import VideoContainer from '../VideoContainer/VideoContainer';
import BusinessContainer from '../BuisnessForm/BusinessContainer';


function Hero({businesses}) {
    return (
        <Container fluid className='p-0'>
            <VideoContainer />
            <Row className='py-5 m-0'>
                <h3>Places you might like</h3>
            </Row>
            <BusinessContainer businesses={businesses} />
        </Container>
    )
}

export default Hero
