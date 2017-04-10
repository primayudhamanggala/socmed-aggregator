const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))

const twatt = require('./routes/twatt')

app.use('/twitter', twatt)

app.listen(3000)
