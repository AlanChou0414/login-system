import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

// Login Api
const url = 'http://localhost:3005/api/member/login'

const Login = () => {
  const [memberEmail, setMemberEmail] = useState('')
  const [memberPassword, setMemberPassword] = useState('')

  const handleCheckUserButton = (e) => {
    if (memberEmail === '' || memberPassword === '') return
    Axios.post(url, {
      memberEmail,
      memberPassword
    }).then((response) => {
      const data = response.data
      if (data.message) {
        alert(data.message)
      } else {
        alert(`Welcome user : ${data[0].name}`)
        location.href = '/#/list'
      }
    })
    setMemberEmail('')
    setMemberPassword('')
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg="auto">
          <h1 className='text-center'>Login</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name='memberEmail'
                type="email"
                placeholder="Enter email"
                required
                value={memberEmail}
                onChange={(e) => {
                  setMemberEmail(e.target.value)
                }}
              />
              <Form.Text className="text-muted">
                {'We\'ll never share your email with anyone else.'}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name='memberPassword'
                type="password"
                placeholder="Password"
                required
                value={memberPassword}
                onChange={(e) => {
                  setMemberPassword(e.target.value)
                }} />
            </Form.Group>
            <div className='text-center'>
              <Button
                variant="outline-dark"
                type="submit"
                onClick={handleCheckUserButton}>
                Submit
              </Button>
              <Link
                className='btn btn-outline-danger m-3'
                role="button"
                to='/signup'>
                Signup
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
