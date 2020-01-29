const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const cors = require('cors')

const server = require('http').createServer(app)
const io = require('socket.io')(server)

mongoose.connect(`mongodb://localhost:27017/bdsi4ano`, { useNewUrlParser: true })
//, useUnifiedTopology: true, useFindAndModify: false

app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use(cors())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resizes')))

app.use(require('./routes'))

server.listen(3333, () => { console.log("http://localhost:3333/") })
// server.listen(8000, () => console.log("SERVER UP"))