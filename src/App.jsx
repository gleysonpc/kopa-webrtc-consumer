import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth'
import { ContextCompose } from './contexts/contextCompose'
import { SocketProvider } from './contexts/websocket'
import Routes from './routes'
import { GlobalStyle } from './styles/global'

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <ContextCompose components={[AuthProvider, SocketProvider]}>
                    <Routes />
                </ContextCompose>
            </BrowserRouter>
        </>
    )
}

export default App
