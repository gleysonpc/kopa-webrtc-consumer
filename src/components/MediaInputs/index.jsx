import { ImPhoneHangUp } from 'react-icons/im'
import { Container, Device } from './styles'
import { useAuth } from '../../contexts/auth'

function MediaInputs() {
    const { signOut } = useAuth()
    const { socket } = window
    
    function handleSignOut(){
        socket?.disconnect()
        signOut() 
        window.location.reload()
    }

    return (
        <Container>
            <div className="device-wrapper">
                <Device onClick={handleSignOut} className="hangup">
                    <ImPhoneHangUp size={25} />
                </Device>
            </div>
        </Container>
    )
}

export default MediaInputs
