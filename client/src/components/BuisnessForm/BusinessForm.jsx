import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function BusinessForm({ addBusiness }) {

    const history = useHistory()

    const formSchema = yup.object().shape({
        business_name: yup.string().required("Please enter business name."),
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
            business_address: '',
            business_city: '',
            business_state: '',
            business_zipcode: '',
            business_category: 'Food & Dining',
            business_description: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/businesses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(resp => resp.json())
                .then(business => {
                    addBusiness(business)
                    history.push('/')
                })
        }
    })
    console.log(formik)
    return (
        <div className='BusinessForm'>
            <form className='text-start'>
                {formik.errors && Object.values(formik.errors).map(error => <h3>{error}</h3>)}
                <label>Business Name:</label>
                <br />
                <input type='text' name='business_name' value={formik.values.business_name} onChange={formik.handleChange} />
                <br />
                <br />
                <label>Business Address:</label>
                <br />
                <input placeholder='Address' type='text' name='business_address' value={formik.values.business_address} onChange={formik.handleChange} />
                <br />
                <input placeholder='City' type='text' name='business_city' value={formik.values.business_city} onChange={formik.handleChange} />
                <br />
                <input placeholder='State' type='text' name='business_state' value={formik.values.business_state} onChange={formik.handleChange} />
                <br />
                <input placeholder='Zipcode' type='number' name='business_zipcode' value={formik.values.business_zipcode} onChange={formik.handleChange} />
                <br />
                <br />
                <label>Category</label>
                <br />
                <select name="business_category" value={formik.values.business_category} onChange={formik.handleChange} >
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
                <br />
                <br />
                <label>Description</label>
                <br />
                <br />
                <textarea name="business_description" rows="5" value={formik.values.business_description} onChange={formik.handleChange} ></textarea>
                <br />
                <br />
                <input type="file" name='business_image' accept="image/png, image/jpeg"></input>
                <br />
                <br />
                <button onClick={formik.handleSubmit} type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default BusinessForm