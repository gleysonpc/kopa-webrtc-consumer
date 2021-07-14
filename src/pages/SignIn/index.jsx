import { useState } from 'react'
import { useAuth } from '../../contexts/auth'
import { SignInContainer, Form, Title } from './styles'

export default function SignIn() {
    const { signIn } = useAuth()
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    function handleSignIn(e) {
        e.preventDefault()
        if (!name || !room)
            return alert('O seu nome e a sala devem ser informados!')

        signIn({ name, room })
    }

    return (
        <SignInContainer>
            <Form onSubmit={handleSignIn}>
                <Title>Entrar</Title>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        value={name}
                        id="name"
                        type="text"
                        placeholder="Informe seu nome"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="room">Sala</label>
                    <input
                        value={room}
                        id="room"
                        type="text"
                        placeholder="informe o nome da sala"
                        onChange={(e) => setRoom(e.target.value)}
                    />
                </div>
                <button type="submit">ENTRAR</button>
            </Form>
        </SignInContainer>
    )
}
