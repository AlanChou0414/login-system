const express = require('express')
const db = require('../../modules/connect-sql')

const router = express.Router()

// Member List
// http://localhost:3005/api/member/list
router.get('/list', (req, res, next) => {
  const sql = 'SELECT * FROM `member_information`'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// Login
// http://localhost:3005/api/member/login
router.post('/login', (req, res, next) => {
  const { memberEmail, memberPassword } = req.body
  const sql = 'SELECT * FROM member_information WHERE email = ? AND password = ?'
  db.query(sql, [memberEmail, memberPassword], (err, result) => {
    if (err) {
      res.send({ err })
    }
    if (result.length > 0) {
      res.send(result)
    } else {
      res.send({ message: 'Wrong EmailName or UserPassword!' })
    }
  })
})

// Signup
// http://localhost:3005/api/member/signup
router.post('/signup', (req, res, next) => {
  const { memberName, memberEmail, memberPassword, create_at } = req.body
  const sql = 'INSERT INTO `member_information` (name,email,password,create_at) VALUES (?,?,?,?)'
  const checkSql = 'SELECT * FROM member_information WHERE email = ?'
  db.query(checkSql, [memberEmail], (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      res.send({
        state: false,
        message: 'This email can\'t signup'
      })
    } else {
      db.query(sql, [memberName, memberEmail, memberPassword, create_at], (err, result) => {
        if (err) throw err
        if (result) {
          res.send({
            state: true,
            message: 'Successful!'
          })
        } else {
          res.send({
            state: false,
            message: 'Error!'
          })
        }
      })
    }
  })
})

module.exports = router
