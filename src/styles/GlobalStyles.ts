/**
 * Application-wide CSS reset, base typography, scrollbar styling,
 * and the deep navy gradient backdrop. Mounted once in App.
 */
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    min-height: 100%;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.sans};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    background-image: ${({ theme }) => theme.gradients.radialGlow};
    background-attachment: fixed;
    line-height: 1.6;
    overflow-x: hidden;
    cursor: none;
    font-size: 16px;
  }

  img, svg, video {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    body { cursor: auto; }
  }

  @media (max-width: 480px) {
    body { font-size: 15px; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: none;
    border: none;
    background: none;
    color: inherit;
  }

  input, textarea {
    font-family: inherit;
    color: inherit;
  }

  h1, h2, h3, h4 {
    font-family: ${({ theme }) => theme.fonts.display};
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.gradients.brand};
    border-radius: ${({ theme }) => theme.radii.pill};
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.45); }
    50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.55); }
  }
`;

export default GlobalStyles;
