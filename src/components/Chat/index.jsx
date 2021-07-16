import { useEffect, useState } from 'react'
import { IoIosPeople, IoIosSend } from 'react-icons/io'
import { useAuth } from '../../contexts/auth'
import ChatItem from './ChatItem'

import { ChatContainer, ChatHeader, MessageList, MessageArea } from './styles'

function sortMessages(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt)
}

export default function Chat() {
    const { user } = useAuth()
    //const { socket } = window
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        async function loadMessagesList() {
            const messagesList = await window.socket?.request(
                'listChatMessages'
            )
            setMessages(messagesList?.sort(sortMessages))
        }
        if (window.socket?.connected) {
            loadMessagesList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.socket?.connected])

    async function sendMessage(e) {
        e.preventDefault()
        setMessage('')
        await window.socket?.request('chatMessage', { message })
        const messagesList = await window.socket?.request('listChatMessages')
        setMessages(messagesList?.sort(sortMessages))
    }

    useEffect(() => {
        window.socket?.on('chatMessage', async (data) => {
            setMessages((state) => [...state, data.message].sort(sortMessages))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.socket?.connected])

    return (
        <ChatContainer>
            <ChatHeader>
                <h3>Chat | {user.room} </h3>
                <p>
                    <IoIosPeople size={30} /> 20 Pessoas
                </p>
            </ChatHeader>
            <MessageList>
                {messages?.map((item, index) => (
                    <ChatItem
                        key={index}
                        user={item.user.name}
                        message={item.message}
                    />
                ))}
            </MessageList>
            <MessageArea onSubmit={sendMessage}>
                <input
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">
                    <IoIosSend size={25} />
                </button>
            </MessageArea>
        </ChatContainer>
    )
}
