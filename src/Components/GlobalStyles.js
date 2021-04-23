import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        font-family: 'Antonio', sans-serif;
        background-color: #eaf9fc;
        color: #023e8a;

    }

    a,button{
        cursor: pointer;
    }


`;

export default GlobalStyles;
