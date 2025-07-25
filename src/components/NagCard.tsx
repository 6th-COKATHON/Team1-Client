import { useBottomSheet } from '@hooks/useBottomSheet'
import { theme } from '@styles/theme'
import styled from 'styled-components'
import { Text } from './Text'
import { frameList } from '@pages/WriteNag'
import { Emoticon1 } from '@assets/icon/Emoticon1'
import { Emoticon2 } from '@assets/icon/Emoticon2'
import { Emoticon3 } from '@assets/icon/Emoticon3'
import { Emoticon4 } from '@assets/icon/Emoticon4'
import { Emoticon5 } from '@assets/icon/Emoticon5'
import { Emoticon6 } from '@assets/icon/Emoticon6'
import { Emoticon7 } from '@assets/icon/Emoticon7'
import { Emoticon8 } from '@assets/icon/Emoticon8'
import { Emoticon9 } from '@assets/icon/Emoticon9'
import { FlexBox } from './layouts/FlexBox'
type NagCardProps = {
  text: string
  imageUrl: string
  faceImageUrl: string
}

export const NagCard = ({ text, imageUrl, faceImageUrl }: NagCardProps) => {
  const { isOpen, open, close, sheetRef } = useBottomSheet()
  const frameIndex = Number(imageUrl) - 1
  const FrameComponent =
    frameList[frameIndex]?.Component ?? frameList[0].Component

  const faceIconList = [
    Emoticon1,
    Emoticon2,
    Emoticon3,
    Emoticon4,
    Emoticon5,
    Emoticon6,
    Emoticon7,
    Emoticon8,
    Emoticon9,
  ]

  const faceIndex = Number(faceImageUrl) - 1
  const FaceIconComponent = faceIconList[faceIndex] ?? null
  return (
    <Container onClick={open}>
      <FrameWrapper>
        <FrameComponent />
      </FrameWrapper>
      <FlexBox direction="column" gap={24}>
        {FaceIconComponent && (
          <FaceIconWrapper>
            <FaceIconComponent />
          </FaceIconWrapper>
        )}
        <IndexWrap>
          <Text children={text} typo="Body_1" color="gray_0" />
        </IndexWrap>
      </FlexBox>
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

const FaceIconWrapper = styled.div`
  color: white;
  z-index: 1;
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
