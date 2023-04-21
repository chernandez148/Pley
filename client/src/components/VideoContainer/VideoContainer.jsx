import React from 'react'
import video from '../../assets/coverVideo.mp4'

function VideoContainer() {
    return (
        <div className='VideoContainer'>
            <video autoPlay loop className='w-100' >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoContainer