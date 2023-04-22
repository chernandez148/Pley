import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import * as yup from 'yup'

function BusinessFormEdit({ updateBusiness }) {
    const [errors, setErrors] = useState(false)
    const history = useHistory()
    const formSchema = yup.object().shape({
        business_name: yup.string().required("Please enter business name."),
        business_number: yup.string().matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Please enter a valid phone number.").required(),
        business_address: yup.string().required("Please enter business address."),
        business_city: yup.string().required("Please enter city."),
        business_state: yup.string().required("Please enter state."),
        business_zipcode: yup.number().positive().required("Please enter a valid zipcode."),
        business_category: yup.string().required("Please select a category."),
        business_description: yup.string().required("Please enter description")
    })
    const formik = useFormik({
        initialValues: {
            business_name: '',
            business_number: '',
            business_address: '',
            business_city: '',
            business_state: '',
            business_zipcode: '',
            business_category: '',
            business_description: ''
        },
        validationSchema: formSchema,
        onSubmit: (values => {
            fetch(`/businesses/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(res => {
                    if (res.ok) {
                        res.json().then(business => {
                            updateBusiness(business)
                            console.log(business.id, "RIGHT HERE")
                            history.push(`/businesses/${business.id}`)
                        })
                    } else {
                        res.json().then(errors => setErrors(errors.message))
                    }
                })
        })
    })
    return (
        <div className='BusinessForm' >
            <Container>
                <Row className='justify-content-center py-5'>
                    <Col sm={4}>
                        {errors && <h2>{errors}</h2>}
                        <form className='text-start'>
                            <label>Business Name:</label>
                            <input type='text' name='business_name' value={formik.values.business_name} onChange={formik.handleChange} />
                            <span>{formik.errors.business_name}</span>
                            <label>Business Number:</label>
                            <input type='tel' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required name='business_number' value={formik.values.business_number} onChange={formik.handleChange} />
                            <span>{formik.errors.business_number}</span>
                            <label>Business Address:</label>
                            <input type='text' name='business_address' placeholder='Address' value={formik.values.business_address} onChange={formik.handleChange} />
                            <span>{formik.errors.business_address}</span>
                            <input type='text' name='business_city' placeholder='City' value={formik.values.business_city} onChange={formik.handleChange} />
                            <span>{formik.errors.business_city}</span>
                            <input type='text' name='business_state' placeholder='State' value={formik.values.business_state} onChange={formik.handleChange} />
                            <span>{formik.errors.business_state}</span>
                            <input type='number' name='business_zipcode' placeholder='Zipcode' value={formik.values.business_zipcode} onChange={formik.handleChange} />
                            <span>{formik.errors.business_zipcode}</span>
                            <label>Category</label>
                            <select name="business_category" value={formik.values.business_category} onChange={formik.handleChange} >
                                <option></option>
                                <option value="Food & Dining">Food & Dining</option>
                                <option value="Automotive">Automotive</option>
                                <option value="Retailer">Retailer</option>
                                <option value="Computers & Electronics">Computers & Electronics</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Health & Medicine">Health & Medicine</option>
                                <option value="Education">Education</option>
                                <option value="Home & Garden">Home & Garden</option>
                                <option value="Legal & Financial">Legal & Financial</option>
                                <option value="Manufacturing, Wholesale, Distribution">Manufacturing, Wholesale, Distribution</option>
                                <option value="Personal Care & Services">Personal Care & Services</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Travel & Transportation">Travel & Transportation</option>
                                <option value="Other">Other</option>
                            </select>
                            <span>{formik.errors.business_category}</span>
                            <label>Description</label>
                            <textarea name="business_description" rows="5" value={formik.values.business_description} onChange={formik.handleChange}></textarea>
                            <span>{formik.errors.business_description}</span>
                            <input type="file" name='business_image' accept="image/png, image/jpeg" />
                            <button type='submit' onClick={formik.handleSubmit}>Submit</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default BusinessFormEdit