const express = require('express')
const setupDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')

const app = express()


setupDB()
app.use(cors())
const port = 3031
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log('litening on port', port)
})