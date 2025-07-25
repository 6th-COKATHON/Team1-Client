import { ArrowBack } from '@assets/icon/ArrowBack'
import { theme } from '@styles/theme'
import styled from 'styled-components'
import { Text } from './Text'
import { useState } from 'react'
import { EmojiIcon } from '@assets/icon/EmojiIcon'
import { SmileIcon } from '@assets/icon/SmileIcon'

type WriteCardProps = {
  frameBg?: React.FC<React.SVGProps<SVGSVGElement>> | null
  text: string
  setText: (text: string) => void
}

export const WriteCard = ({
  frameBg: FrameComponent,
  text,
  setText,
}: WriteCardProps) => {
  return (
    <CardContainer>
      {FrameComponent && (
        <FrameOverlay>
          <FrameComponent />
        </FrameOverlay>
      )}
      <EmojiWrapper>
        <SmileIcon />
      </EmojiWrapper>
      <TextInput
        placeholder="한 마디를 적어주세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <LimitLength>
        <Text
          color={text.length > 180 ? 'red' : 'gray_0'}
          children={text.length}
          typo="Body_3"
        />
        <Text color="gray_0" children=" / 180자" typo="Caption_1" />
      </LimitLength>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  position: relative;
  width: 296px;
  height: 412px;
  padding: 20px 36px 36px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: ${theme.palette.gray_0};
  gap: 20px;
  overflow: hidden;
`

const FrameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`

const EmojiWrapper = styled.div`
  position: relative;
  z-index: 1;
`

const TextInput = styled.textarea`
  all: unset;
  width: 212px;
  height: 244px;
  text-align: center;
  color: inherit;
  white-space: pre-wrap;
  line-height: 24px;
  font-size: 16px;
  background-color: transparent;
  font-weight: 500;
  z-index: 1;
  position: relative; // ✅ z-index 적용을 위해 필요
  &::placeholder {
    color: ${theme.palette.gray_0};
    opacity: 0.5;
  }
`

const LimitLength = styled.div`
  display: flex;
  height: 30px;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.3);
`
