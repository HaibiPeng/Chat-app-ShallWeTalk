require('dotenv').config()
const app = require('./app')
const socketio = require('socket.io')
const cors = require('cors')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const { getUser, addUser, removeUser, getUsersInRoom } = require('./users.js')

const PORT = process.env.PORT || 5000

const router = require('./router')

//const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log('We have a new connection!')

    socket.on('join', ({username, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })

        //if (error) return callback(error)

        socket.emit('message', { user: 'admin', text: `${user.username}, welcome to the room` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.username} has joinded`})
        

        socket.join(user.room)

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
    })

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id)
      io.to(user.room).emit('message', { user: user.username, text: message })
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
    
      callback()
    })

    socket.on('disconnected', () => {
        const user = removeUser(socket.id)

        if (user) {
          io.to(user.room).emit('message', { user: 'admin', text: `${user.username} has left!` })
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        }
    })
})

app.use(cors())
app.use(router)

morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(bodyParser.json())

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
//server.listen(PORT)
