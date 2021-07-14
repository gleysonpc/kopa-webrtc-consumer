import React, { createContext, useContext, useState } from 'react'
import SocketIO from 'socket.io-client'
import jwt from 'jsonwebtoken'

const SocketContext = createContext({
    socket: {},
    authenticateSocket: null,
    destroySocketConnection: null,
})
let socketConnection

function getSocketConnection(userName, roomName) {
    const rawToken = {
        name: userName,
        room: roomName,
    }

    const token = jwt.sign(rawToken, 'oqksmz')
    const hostname = process.env.REACT_APP_WS

    if (socketConnection) {
        return socketConnection
    }

    socketConnection = SocketIO(hostname, {
        auth: { token },
        transport: ['websocket', 'polling'],
        path: '/v6',
    })

    window.testeSocket = socketConnection

    socketConnection.request = (type, data = {}) => {
        return new Promise((resolve) => {
            socketConnection.emit(type, data, resolve)
        })
    }

    socketConnection.on('connect', async () => {
        await socketConnection.request('joinRoom', { roomId: rawToken.room })
    })

    return socketConnection
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState({})

    function authenticateSocket(name, room) {
        setSocket(getSocketConnection(name, room))
    }

    function destroySocketConnection() {
        if (socket?.connected) {
            socket.disconnect()
        }
    }

    return (
        <SocketContext.Provider
            value={{ socket, authenticateSocket, destroySocketConnection }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export function useSocket() {
    const context = useContext(SocketContext)
    return context
}
