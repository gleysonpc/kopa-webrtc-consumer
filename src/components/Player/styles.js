import styled from 'styled-components'

export const PlayerContainer = styled.div`
    width: 100%;
    overflow: hidden;
    max-width: 70%;    
    display: flex;
    flex-direction: column;
    padding: 20px;
    
    
    video {
        border-radius: 15px;
        width: 100%;
        max-height: calc(100vh - 200px );
        object-fit: cover;
    }

    @media(max-width: 800px){
        max-width: 100%;    
    }
`

export const PlayerFooter = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

`

export const Avatar = styled.div`
    display: flex;
    align-items: center;

    img {
        height: 60px;
        margin-right: 10px;
    }
`

export const LiveButton = styled.button`
    background-color: #6b5ecd;
    height: 60px;
    border: none;
    border-radius: 15px;
    color: #fff;
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;    
    font-size: 17px;

    svg {
        margin-right: 5px;
        margin-bottom: 6px;
    }
    
    &:hover{
        filter: brightness(80%);
    }

    &:active{
        filter: none;
    }

    &.isLive {
        background-color: red;
    }

    &:disabled{
        background-color: #363342;
    }
`
