import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { media } from './theme'
import { theme } from './theme'

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  @font-face {
    font-family: "Pretendard-Bold";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff")
      format("woff");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard-SemiBold";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff")
      format("woff");
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard-Medium";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff")
      format("woff");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }
    body {
    font-family: 'Pretendard-Regular';
    background-color: ${theme.palette.gray_800};
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

  /* &::-webkit-scrollbar {
    display: none;
  } */
`

export default GlobalStyle
