import { useFormik } from 'formik'
import * as yup from 'yup'

function ReviewForm({ addReviews, business_id }) {

    const formSchema = yup.object().shape({
        rating: yup.number().required("Please enter rating."),
        review: yup.string().required("Please neter review"),
    })

    const formik = useFormik({
        initialValues: {
            rating: '',
            review: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const req_object = {
                ...values,
                business_id
            }
            fetch('/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req_object)
            })
                .then(resp => resp.json())
                .then(review => {
                    addReviews(review)
                })
        }
    })


    return (
        <form className='text-start'>
            <label>Rating</label>
            <select name="rating" value={formik.values.rating} onChange={formik.handleChange} >
                <option></option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Great</option>
                <option value="5">5 - Excelent</option>
            </select>
            <span>{formik.errors.rating}</span>
            <label>Review</label>
            <textarea name="review" rows="5" value={formik.values.review} onChange={formik.handleChange}></textarea>
            <span>{formik.errors.review}</span>
            <button type='submit' onClick={formik.handleSubmit}>Submit</button>
        </form>
    )
}

export default ReviewForm;
