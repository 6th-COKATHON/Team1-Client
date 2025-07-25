import { theme } from '@styles/theme'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  max-width: 480px;
  background-color: ${theme.palette.gray_0};
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
`
