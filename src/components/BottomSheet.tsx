import React from 'react'
import styled from 'styled-components'
import { Text } from './Text'

type Props = {
  isOpen: boolean
  children: React.ReactNode
  bottomSheetRef: React.RefObject<HTMLDivElement | null>
}

export const BottomSheet = ({ isOpen, children, bottomSheetRef }: Props) => {
  if (!isOpen) return null

  return (
    <Overlay>
      <SheetContainer ref={bottomSheetRef}>
        <ScrollContent>{children}</ScrollContent>
      </SheetContainer>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const SheetContainer = styled.div`
  width: 100%;
  max-width: 480px;
  height: min(514px, 100vh);
  background: white;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
`

const ScrollContent = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 16px;
`
