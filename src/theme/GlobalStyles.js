import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.main};
  }

  h2 {
    font-family: ${({ theme }) => theme.fonts.main};
    font-weight: 500;
  }
`;

export default GlobalStyles;