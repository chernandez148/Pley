import React from 'react'
import Container from 'react-bootstrap/Container';
import VideoContainer from '../VideoContainer/VideoContainer';


function Hero() {
    return (
        <Container fluid className='p-0'>
            <VideoContainer />
        </Container>
    )
}

export default Hero