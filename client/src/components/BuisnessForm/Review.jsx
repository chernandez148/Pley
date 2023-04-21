import React from 'react';
import { Button } from 'react-bootstrap';

function Review({ review, deleteReviews }) {

    const handleDelete = (userReviewID) => {
        fetch(`/reviews/${review.id}`, {
            method: 'DELETE',
        })
            .then(() => {
                deleteReviews(userReviewID);
            });
    };

    return (
        <div key={review.id}>
            Rating: {review.rating} <br />
            {review.review} <br />
            <Button variant="danger" onClick={() => handleDelete(review.id)}>
                Delete
            </Button>
        </div>
    );
}

export default Review;
