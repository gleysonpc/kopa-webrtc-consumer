import styled from 'styled-components'

export const Container = styled.div`
    position: absolute;
    bottom: 15px;
    width: 70%;
    display: flex;
    justify-content: center;
    z-index: 10;
    .device-wrapper {
        position: relative;
        margin: 0 10px;
    }

    .list-devices {
        position: absolute;
        border-radius: 50%;
        border: 1px solid #343a40;
        height: 20px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        padding: 2px;
        z-index: 5;
        top: 4px;
        right: -5px;
    }

    @media(max-width: 800px){
        width: 95%;    
    }
`

export const Device = styled.div`
    border-radius: 50%;
    border: 1px solid #343a40;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    background-color: #1f1d2c;
    &.hangup{
        background-color: red;
    }
`

export const DeviceList = styled.div`
    position: absolute;
    background-color: #262837;
    border-radius: 5px;
    z-index: 5;
    bottom: 53px;
    right: -110px;
    padding: 10px;    

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        li {
            color: #fff;
            text-align: center;
            min-width: 250px;
            cursor: pointer;
            padding: 2px 10px;
            margin: 5px 0;
            font-size: 14px;
            &.active {
                border-radius: 5px;
                padding: 10px;
                background-color: #1f1d2c;
            }
        }
    }
`
export const DeviceType = styled.h6`
    font-weight: bold;
    text-align: center;
    color: #fff;
    margin: 5px 0;
    margin-bottom: 15px;
`