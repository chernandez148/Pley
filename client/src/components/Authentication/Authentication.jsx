// import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import { useFormik } from 'formik'
// import { Col, Row, Container } from 'react-bootstrap';
// import * as yup from 'yup'

// function Authentication() {
//     const [signUp, setSignUp] = useState(false)
//     const history = useHistory()

//     const handleClick = () => setSignUp((signUp) => !signUp)
//     const formSchema = yup.object().shape({
//         fname: yup.string().requierd('Please enter your first name'),
//         lname: yup.string().requierd('Please enter your last name'),
//         email: yup.string().email()
//     })

//     const formik = useFormik({
//         initialValues: {
//             fname: '',
//             lname: '',
//             type: '',
//             email: '',
//             password: ''
//         },
//         validationSchema: formSchema,
//         onSubmit: (values) => {
//             fetch(signUp ? '/signup' : '/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(values, null, 2),
//             })
//                 .then(resp => {
//                     if (resp.ok) {
//                         resp.json().then(user => {
//                             updateUser(user)
//                             history.push('/')
//                         })
//                     } else {

//                         resp.json().then(console.log)
//                     }
//                 })
//         },
//     })
//     return (
//         <div className='Authentication'>
//             <Container fluid>
//                 <Row>
//                     <Col></Col>
//                     <Col>
//                         <h1>Please Log in or Sign Up</h1>
//                         <h1>{signUp ? 'Already a member?' : 'Not a member?'}</h1>
//                         <button onClick={handleClick}>{signUp ? 'Log In!' : 'Register now!'}</button>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     )
// }

// export default Authentication