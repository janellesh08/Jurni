import { Col, Container, Row, Form, Button, FloatingLabel } from 'react-bootstrap'
import { useState } from "react"
import { connect, useDispatch } from 'react-redux'


function LoginRegister() {


    const [user, setUser] = useState({
    })

    // const [registerForm, setRegisterForm ] = useState({
    //     username: '',
    //     password: ''
    // })

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = (e) => {
        console.log(user)
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        }).then(res => res.json())
            .then(userData => {
                console.log(userData)
            })
    }


    const handleCreateAccount = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/api/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                password: user.password
            })
        }).then(res => res.json())
            .then(userData => {
                console.log(userData)
            })
    }


//     fetch('localhost:8080/api/login')
//     .then(response => response.json)
//     .then(userData => console.log(userData))
// }



//const mapDispatchToProps = (dispatch) => {
//     return{
//         onLoginSubmit: (userId) => dispatch({type: 'USER_LOGIN', payload: userId})
//     }
// }

return (
    <Container>
        <Row>
            <Col>Log In</Col>
            <Col>Create Account</Col>
        </Row>
        <Row>
            <Col><Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                        <Form.Control name="username" onChange={handleChange} type="text" placeholder="Username" />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                        <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password" name="password" />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="primary" onClick={handleLogin}>
                    Log in
                </Button>
            </Form></Col>
            <Col>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel controlId="floatingInput" label="First name" className="mb-3"><Form.Control onChange={handleChange} name="firstName" type="text" placeholder="First name" /></FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Last name" className="mb-3"><Form.Control onChange={handleChange} name="lastName" type="text" placeholder="Last name" /></FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3"><Form.Control onChange={handleChange} name="email" type="email" placeholder="name@example.com" /></FloatingLabel>
                    <FloatingLabel controlId="floatingUsername" label="Username"> <Form.Control onChange={handleChange} name="username" type="text" placeholder="Username" /></FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password"><Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" /></FloatingLabel>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button onClick={handleCreateAccount} variant="primary" type="submit">
                    Create account
                </Button>
                </Form>
            </Col>
        </Row>

    </Container>
)
}

export default LoginRegister;