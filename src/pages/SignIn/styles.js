import styled from 'styled-components'

export const SignInContainer = styled.div`
    height: 98vh;
    display: flex;
    justify-content: center;
    align-items: center;    
`

export const Form = styled.form`
    background-color: #222430;
    max-width: 500px;
    width: 400px;
    height: 500px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    justify-content: space-between;
    
    label {
        color: #7e8291;    
        margin-left: 10px;    
    }

    input {
        width: 100%;
        background-color: #2e303f;
        border: none;
        color: #fff;
        outline: none;
        border-radius: 20px;
        padding: 10px;
        height: 45px;
        margin: 5px 0 20px 0;
    }

    button {
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
    }
`

export const Title = styled.h2`
    text-align: center;
`