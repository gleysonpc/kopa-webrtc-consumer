import { useEffect, useRef } from 'react'
import Chat from '../../components/Chat'
import mediaSoup from '../../services/mediasoupService'

import Player from '../../components/Player'

import { Layout } from './styles'
import { useAuth } from '../../contexts/auth'
import { getSocketConnection } from '../../services/socketService'

export default function Producer() {
    const { user } = useAuth()

    const videoElement = useRef()
    const audioElement = useRef()

    useEffect(() => {
        if (user.name) {
            getSocketConnection(user.name, user.room)
        }
    }, [user.name, user.room])

    function startTransmission() {
        if (window.socket?.connected) {
            mediaSoup.setSocket(window.socket)
            mediaSoup.setAudioObject(audioElement.current)
            mediaSoup.setVideoObject(videoElement.current)
            mediaSoup.rtcConnect()
        }
    }

    return (
        <Layout>
            <Player
                toggleIsLive={startTransmission}
                videoRef={videoElement}
                audioRef={audioElement}
            />
            <Chat />
        </Layout>
    )
}
