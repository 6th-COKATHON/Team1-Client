import { createRoot } from 'react-dom/client'
import App from './App'

import { ThemeProvider } from 'styled-components'
import GlobalStyle from '@styles/GlobalStyle'
import { theme } from '@styles/theme'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>,
)
