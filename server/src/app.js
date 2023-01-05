const express = require('express')
const app = express()
const middleware = require('./middleware')
const member = require('./router/member/member')
require('dotenv').config()

app.use(middleware)
app.use('/api/member', member)

module.exports = app
