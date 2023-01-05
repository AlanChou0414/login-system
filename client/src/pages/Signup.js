import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import dayjs from 'dayjs'

// Signup Api
const url = 'http://localhost:3005/api/member/signup'

const Signup = () => {
  const [memberName, setMemberName] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [memberPassword, setMemberPassword] = useState('')
  const handleSignup = (e) => {
    Axios.post(url, {
      memberName,
      memberEmail,
      memberPassword,
      create_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }).then((response) => {
      const data = response.data
      console.log(data)
      if (data.state) {
        alert(data.message)
        location.href = '/#/list'
      } else {
        alert(data.message)
        location.href = '/#/'
      }
    })
    setMemberName('')
    setMemberEmail('')
    setMemberPassword('')
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs lg="3">
          <h1 className='text-center'>Sign Up</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                name='memberName'
                type="text"
                placeholder="Your name..."
                required
                value={memberName}
                onChange={(e) => {
                  setMemberName(e.target.value)
                }}
              />
            </Form.Group>
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
                type="button"
                onClick={handleSignup}
              >
                Submit
              </Button>
              <Link
                className='btn btn-outline-danger m-3'
                role="button"
                to='/'>
                Backto
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup
