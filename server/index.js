const { WebSocketServer } = require('ws')
const http = require('http')
const uuidv4 = require('uuid').v4
const url = require('url')

const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000
const connections = {}
const users = {}

const handleMessage = (bytes, uuid) => {
  try {
    const message = JSON.parse(bytes.toString())
    const user = users[uuid]
    
    if (!user) {
      console.error(`User with uuid ${uuid} not found`)
      return
    }
    
    user.state = message
    broadcast()
    console.log(`${user.username} updated their state: ${JSON.stringify(user.state)}`)
  } catch (error) {
    console.error('Error handling message:', error.message)
  }
}

const handleClose = uuid => {
  const user = users[uuid]
  if (user) {
    console.log(`${user.username} disconnected`)
    delete connections[uuid]
    delete users[uuid]
    broadcast()
  }
}

const broadcast = () => {
  const message = JSON.stringify(users)
  Object.keys(connections).forEach(uuid => {
    const connection = connections[uuid]
    try {
      if (connection.readyState === 1) { // WebSocket.OPEN
        connection.send(message)
      }
    } catch (error) {
      console.error(`Error sending message to ${uuid}:`, error.message)
    }
  })
}

wsServer.on('connection', (connection, request) => {
  const { username } = url.parse(request.url, true).query
  
  if (!username) {
    console.warn('Connection attempted without username')
    connection.close(1008, 'Username is required')
    return
  }
  
  console.log(`${username} connected`)
  const uuid = uuidv4()
  connections[uuid] = connection
  users[uuid] = {
    username,
    state: {}
  }
  
  // Broadcast initial state to all clients including the new one
  broadcast()
  
  connection.on('message', message => handleMessage(message, uuid))
  connection.on('close', () => handleClose(uuid))
  connection.on('error', error => {
    console.error(`Connection error for ${username}:`, error.message)
  })
})

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
})