import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

const Container = styled.div``
