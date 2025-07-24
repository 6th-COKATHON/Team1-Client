import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { media } from "./theme";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
  ${reset}

    body {
    /* font-family 추후 설정  */
    background-color: ${theme.palette.white};
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    ${media.mobile}{
        -ms-overflow-style: none;
    }
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  input:focus {
    outline: none;
  }
  textarea:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
