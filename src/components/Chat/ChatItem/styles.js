import styled from 'styled-components'

export const ChatItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    .message-section {
        h5 {
            margin: 0 0 3px 0;
        }

        p {
            margin: 0;
            font-size: 14px;
            color: #7e8291;
        }
    }
`