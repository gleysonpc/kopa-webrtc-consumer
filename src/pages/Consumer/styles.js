import styled from 'styled-components'

export const Layout = styled.div`
    display: flex;
    justify-content: space-between;

    @media(max-width: 800px){
        flex-direction: column;
    }
`