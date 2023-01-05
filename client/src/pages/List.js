import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { React, useEffect, useState } from 'react'
import Axios from 'axios'

// Member List Api
const url = 'http://localhost:3005/api/member/list'

const List = () => {
  const [userList, setUserList] = useState([])

  const handleUserList = () => {
    Axios.get(url)
      .then(response => {
        const data = response.data
        console.log(data)
        setUserList(data)
      })
  }

  useEffect(() => {
    handleUserList()
  }, [])

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg="lg">
          <h1 className='text-center'>User List</h1>
          <Table className='mt-5' striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {
                userList.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <div className="text-center">
            <Link
              className='btn btn-outline-dark'
              role="button"
              to='/signup'>
              Signup
            </Link>
            <Button
              variant="outline-warning m-3"
              type="reset"
              onClick={handleUserList}>
              Reset
            </Button>
            <Link
              className='btn btn-outline-danger'
              role="button"
              to='/'>
              Backto
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default List
