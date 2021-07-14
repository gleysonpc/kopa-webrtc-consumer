import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
    html {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    -ms-overflow-style: scrollbar;
    }

    *,
    *::before,
    *::after {
    -webkit-box-sizing: inherit;
            box-sizing: inherit;
    }
    
    body{
      font-family: sans-serif;
      background-color: #1f1d2c;
      color: #fff;
    }
`