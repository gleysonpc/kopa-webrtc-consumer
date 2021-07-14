import styled from 'styled-components'

export const ChatContainer = styled.div`
    background-color: #262837;
    height: calc(98vh - 20px);
    border-radius: 20px;
    width: 28%;
    min-width: 300px;
    position: relative;    
    overflow: hidden;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 11;

    @media(max-width: 800px){
        width: calc(100% - 40px);        
        height: inherit;        
        padding-bottom: 0;
        margin: 0 20px 0 20px;
    }

`

export const ChatHeader = styled.div`
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    p {
        color: #7e8291;
        svg {
            margin-right: 5px;
        }
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const MessageList = styled.div`
    padding: 0 20px;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;       
    align-content: flex-end;    
`

export const MessageArea = styled.form`    
    bottom: 0;
    height: 60px;
    display: flex;
    width: 100%;
    padding: 8px;
    background: #262737;
    position: relative;

    input {
        width: 100%;
        background-color: #2e303f;
        border: none;
        color: #fff;
        outline: none;
        border-radius: 20px;
        padding: 0 45px 0 10px;
        height: 45px;
    }

    button {
        background-color: #6b5ecd;
        border: none;
        color: #fff;
        outline: none;
        border-radius: 50%;
        position: absolute;
        height: 38px;
        width: 38px;
        top: 12px;
        right: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover{
        filter: brightness(80%);
        }

        &:active{
            filter: none;
        }
    }
`