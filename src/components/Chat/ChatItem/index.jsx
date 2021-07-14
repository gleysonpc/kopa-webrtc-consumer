import { ChatItemContainer } from './styles'
import avatarImg from '../../../assets/Avatar.png'

export default function ChatItem({ user, message }) {
    return (
        <ChatItemContainer>
            <img src={avatarImg} alt="user avatar" />
            <div className="message-section">
                <h5>{user}</h5>
                <p>
                    {message}
                </p>
            </div>
        </ChatItemContainer>
    )
}
