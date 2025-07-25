import { ArrowBack } from '@assets/icon/ArrowBack'
import { theme } from '@styles/theme'
import styled from 'styled-components'
import { Text } from './Text'
import { useRef, useState } from 'react'
import { SmileIcon } from '@assets/icon/SmileIcon'
import { Emoticon1 } from '@assets/icon/Emoticon1'
import { Emoticon2 } from '@assets/icon/Emoticon2'
import { Emoticon3 } from '@assets/icon/Emoticon3'
import { Emoticon4 } from '@assets/icon/Emoticon4'
import { Emoticon5 } from '@assets/icon/Emoticon5'
import { Emoticon6 } from '@assets/icon/Emoticon6'
import { Emoticon7 } from '@assets/icon/Emoticon7'
import { Emoticon8 } from '@assets/icon/Emoticon8'
import { Emoticon9 } from '@assets/icon/Emoticon9'
import { useBottomSheet } from '@hooks/useBottomSheet'
import { BottomSheet } from './BottomSheet'
import { EmojiIcon } from '@assets/icon/EmojiIcon'

const emojiList = [
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

type WriteCardProps = {
  frameBg?: React.FC<React.SVGProps<SVGSVGElement>> | null
  text: string
  setText: (text: string) => void
  setEmojiKey: (key: string) => void // ✅ 추가
}
export const WriteCard = ({
  frameBg: FrameComponent,
  text,
  setText,
  setEmojiKey,
}: WriteCardProps) => {
  const { isOpen, open, close } = useBottomSheet()
  const [selectedEmoji, setSelectedEmoji] = useState<React.FC<
    React.SVGProps<SVGSVGElement>
  > | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const bottomSheetRef = useRef<HTMLDivElement | null>(null)

  const handleEmojiSelect = (
    EmojiComponent: React.FC<React.SVGProps<SVGSVGElement>>,
    idx: number,
  ) => {
    setSelectedEmoji(() => EmojiComponent)
    setEmojiKey((idx + 1).toString())
    setIsSheetOpen(false)
  }

  const EmojiComponent = selectedEmoji

  return (
    <CardContainer>
      {FrameComponent && (
        <FrameOverlay>
          <FrameComponent />
        </FrameOverlay>
      )}

      <EmojiWrapper onClick={() => setIsSheetOpen(true)}>
        {EmojiComponent ? <EmojiComponent fill="white" /> : <EmojiIcon />}
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

      <BottomSheet isOpen={isSheetOpen} bottomSheetRef={bottomSheetRef}>
        <EmojiGrid>
          {emojiList.map((Emoji, idx) => {
            const isSelected = selectedEmoji === Emoji
            return (
              <EmojiButton
                key={idx}
                selected={isSelected}
                onClick={() => handleEmojiSelect(Emoji, idx)}
              >
                <Emoji />
              </EmojiButton>
            )
          })}
        </EmojiGrid>
      </BottomSheet>
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
  position: relative;
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

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  padding: 16px;
`

const EmojiButton = styled.button<{ selected: boolean }>`
  all: unset;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`
