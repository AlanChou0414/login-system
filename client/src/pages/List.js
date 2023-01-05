import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { React, useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import Axios from 'axios'
import dayjs from 'dayjs'

// Member List Api
const url = 'http://localhost:3005/api/member/list'

const List = () => {
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(true)

  const handleUserList = () => {
    setLoading(true)
    Axios.get(url)
      .then(response => {
        const data = response.data
        setUserList(data)
        // console.log(data)
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleUserList()
  }, [])

  // TODO: setting delete function
  const deleteItem = (id) => {

  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg="lg">
          <h1 className='text-center'>User List</h1>
          <Table className='mt-5' striped bordered hover responsive="md">
            <thead>
              <tr className='text-center'>
                <th colSpan={1}>Operate</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Create at</th>
              </tr>
            </thead>
            <tbody>
              {
                loading
                  ? (<h1>Loading...</h1>)
                  : userList.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className='text-center'>
                          <MdDelete className='m-2' type='button' onClick={deleteItem(item.id)} />
                          <AiFillEdit className='m-2' type='button' />
                        </td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>{dayjs(item.create_at).format('YYYY-MM-DD HH:mm:ss')}</td>
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
