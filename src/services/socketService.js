import SocketIO from 'socket.io-client'
import jwt from 'jsonwebtoken'

let socketConnection

export function getSocketConnection(userName, roomName) {
    const rawToken = {
        name: userName,
        room: roomName
    }
   
    const hostname = process.env.REACT_APP_WS

    if (socketConnection) {
        return socketConnection
    }

    socketConnection = SocketIO(hostname, { auth: { token: rawToken }, transport: ['websocket', 'polling'], path: '/v6' })   

    socketConnection.request = (type, data = {}) => {
        return new Promise((resolve) => {
            socketConnection.emit(type, data, resolve)
        })
    }

    socketConnection.on('connect', async () => {
        await socketConnection.request('joinRoom', { roomId: rawToken.room })
    })

    window.socket = socketConnection

    return socketConnection
}