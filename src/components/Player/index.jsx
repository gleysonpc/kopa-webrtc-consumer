import { MdLiveTv } from 'react-icons/md'
import { PlayerContainer, PlayerFooter, LiveButton, Avatar } from './styles'
import avatarImg from '../../assets/Avatar.png'
import MediaInputs from '../MediaInputs'
import { useAuth } from '../../contexts/auth'

export default function Player({
    videoRef,
    stream,
    toggleIsLive,
    isLive,
}) {
    const { user } = useAuth()
    return (
        <PlayerContainer>
            <video autoPlay ref={videoRef}>
                Your browser does not support the video tag.
            </video>
            <PlayerFooter>
                <Avatar>
                    <img src={avatarImg} alt="Avatar" />
                    <p>{user.name}</p>
                </Avatar>
                <LiveButton                   
                    className={isLive ? 'isLive' : ''}
                    onClick={() => toggleIsLive()}
                >
                    <MdLiveTv size={30} />
                    {isLive ? 'Encerrar Live' : 'Iniciar Live'}
                </LiveButton>
            </PlayerFooter>
            <MediaInputs />
        </PlayerContainer>
    )
}
