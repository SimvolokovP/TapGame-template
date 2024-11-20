const express = require('express')
const bot = require('./service/TelegramService')

const app = express()
app.use(express.json())

const PORT = 8000

app.listen(PORT, () => console.log('The server is running on port ' + PORT))
