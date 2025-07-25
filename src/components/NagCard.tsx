import { useBottomSheet } from '@hooks/useBottomSheet'
import { theme } from '@styles/theme'
import styled from 'styled-components'
import { Text } from './Text'
import { frameList } from '@pages/WriteNag'
type NagCardProps = {
  text: string
  imageUrl: string
}

export const NagCard = ({ text, imageUrl }: NagCardProps) => {
  const { isOpen, open, close, sheetRef } = useBottomSheet()
  const frameIndex = Number(imageUrl) - 1
  const FrameComponent =
    frameList[frameIndex]?.Component ?? frameList[0].Component

  return (
    <Container onClick={open}>
      <FrameWrapper>
        <FrameComponent />
      </FrameWrapper>
      <IndexWrap>
        <Text children={text} typo="Body_1" color="gray_0" />
      </IndexWrap>
    </Container>
  )
}

const Container = styled.div`
  width: 296px;
  height: 412px;
  padding: 20px 36px 36px 36px;
  gap: 10px;
  border-radius: 20px;
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${theme.palette.gray_0};
  position: relative;
  overflow: hidden;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const IconWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  padding: 12px;
`
const ThumbWrapper = styled.div`
  display: flex;
  gap: 12px;
`
const FrameWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 296px;
  height: 412px;
  z-index: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`
const IndexWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
`
