const express = require('express')
const cluster = require("cluster");
const OS = require("os")
const cors = require('cors');
require("dotenv").config();

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRouter = require('./routes/auth.routes')
app.use('/auth', authRouter)
