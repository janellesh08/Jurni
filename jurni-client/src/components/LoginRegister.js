import { Col, Container, Row, Form, Button, FloatingLabel } from 'react-bootstrap'
import { useState } from "react"


function LoginRegister(){

const [user, setUser] = useState({})

const handleChange = (e) => {
    setUser({
        [e.target.name]: e.target.value
    })
}

const handleSubmit = () => {
    console.log(user)
}

    return(
        <Container>
<Row>
    <Col>Log In</Col>
    <Col>Create Account</Col>
</Row>
  <Row>
  <Col><Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <FloatingLabel controlId="floatingInput" label="Username" className="mb-3"><Form.Control type="text" placeholder="Username" /></FloatingLabel>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange= {handleChange} type="password" placeholder="Password" name="password"/>
  </Form.Group>
  <Button variant="primary" onClick={handleSubmit}>
    Log in
  </Button>
</Form></Col>
<Col>
  <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel controlId="floatingInput" label="First name" className="mb-3"><Form.Control type="text" placeholder="First name" /></FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Last name" className="mb-3"><Form.Control type="text" placeholder="Last name" /></FloatingLabel>
  <FloatingLabel
    controlId="floatingInput" label="Email address" className="mb-3">
    <Form.Control type="email" placeholder="name@example.com" />
  </FloatingLabel>
  <FloatingLabel controlId="floatingUsername" label="Username">
    <Form.Control type="text" placeholder="Username" />
  </FloatingLabel>
  <FloatingLabel controlId="floatingPassword" label="Password">
    <Form.Control type="password" placeholder="Password" />
  </FloatingLabel> 
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit">
    Create account
  </Button>
</Col>
  </Row>
  
</Container>
    )
}

export default LoginRegister;