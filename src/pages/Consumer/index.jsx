import { useEffect, useRef, useState } from 'react'
import Chat from '../../components/Chat'
import mediaSoup from '../../services/mediasoupService'

import Player from '../../components/Player'

import { Layout } from './styles'
import { useAuth } from '../../contexts/auth'
import { getSocketConnection } from '../../services/socketService'

export default function Producer() {
    const [localStream, setLocalStream] = useState()
    const [isLive, setIsLive] = useState(false)
    const { user } = useAuth()
    const { socket } = window

    const videoElement = useRef()

    function gotStream(stream) {
        setLocalStream(stream)
    }

    useEffect(() => {
        if (user.name) {
            getSocketConnection(user.name, user.room)
        }
    }, [user.name, user.room])

    useEffect(() => {
        videoElement.current.srcObject = localStream
    }, [localStream])

    function toggleIsLive() {
        if (!socket.connected) return alert('Socket não conectado!')
        alert('Socket conectado!')
    }

    useEffect(() => {
        if (socket?.connected) {
            mediaSoup.setSocket(socket)            
            mediaSoup.startTransmission()
            console.log(mediaSoup._stream)
        }
    }, [socket])

    function starStransmission(){
        if (socket?.connected) {
            mediaSoup.setSocket(socket)            
            mediaSoup.startTransmission()           
        }
    }

    return (
        <Layout>
            <Player
                isLive={isLive}
                toggleIsLive={toggleIsLive}
                stream={localStream}
                videoRef={videoElement}
            />
            <Chat />
        </Layout>
    )
}
