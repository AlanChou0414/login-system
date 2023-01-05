import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { React, useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import Axios from 'axios'
import dayjs from 'dayjs'

// Member List Api
const url = 'http://localhost:3005/api/member/list'
// Delete Api

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

  const handleDeleteButton = (e) => {
    if (!confirm(`Delete user ID: ${e.currentTarget.id} , Are you sure ? `)) return
    Axios.delete(`http://localhost:3005/api/member/delete/?id=${e.currentTarget.id}`)
      .then(response => {
        const data = response.data
        if (data.state) {
          alert(data.message)
          window.location.reload(true)
        } else {
          alert(data.message)
        }
      })
  }

  // TODO: setting edit function
  // const handleEditButton = (id) => {

  // }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg="lg">
          {loading
            ? (<h1 className='text-center'>Loading...</h1>)
            : (
              <>
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
                    {userList.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className='text-center'>
                            <MdDelete className='m-2' type='button' id={item.id} onClick={handleDeleteButton} />
                            <AiFillEdit
                              className='m-2'
                              type='button'
                              id={item.id}
                              // TODO:
                              // onClick={(e) => handleEditButton(e.currentTarget.id)}
                            />
                          </td>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.password}</td>
                          <td>{dayjs(item.create_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                        </tr>
                      )
                    })}
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
                    onClick={() => { window.location.reload(true) }}>
                    Reset
                  </Button>
                  <Link
                    className='btn btn-outline-danger'
                    role="button"
                    to='/'>
                    Backto
                  </Link>
                </div>
              </>)
          }
        </Col>
      </Row>
    </Container >
  )
}

export default List
