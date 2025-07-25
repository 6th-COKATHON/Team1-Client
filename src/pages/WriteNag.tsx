import { useBottomSheet } from '@hooks/useBottomSheet'
import { BottomSheet } from '@components/BottomSheet'
import { CategoryMap } from '@components/CategoryMap'
import { ArrowBack } from '@assets/icon/ArrowBack'
import { ArrowDown } from '@assets/icon/ArrowDown'
import { CloseIcon } from '@assets/icon/CloseIcon'
import { FlexBox } from '@components/layouts/FlexBox'
import { Text } from '@components/Text'
import { WriteCard } from '@components/WriteCard'
import { theme } from '@styles/theme'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { selectedCategoryAtom } from '@constants/categroyState'
import { useState } from 'react'
import { PinkIcon } from '@assets/image/Pink'
import { BlueIcon } from '@assets/image/Blue'
import { RedIcon } from '@assets/image/Red'
import { GreenIcon } from '@assets/image/Green'
import { YellowIcon } from '@assets/image/Yellow'
import { Black } from '@assets/image/Black'
import { White } from '@assets/image/White'
import { axiosApi } from '@apis/axios'

export const frameList = [
  { name: 'pink', Component: PinkIcon },
  { name: 'blue', Component: BlueIcon },
  { name: 'red', Component: RedIcon },
  { name: 'green', Component: GreenIcon },
  { name: 'yellow', Component: YellowIcon },
  { name: 'black', Component: Black },
]
export const WriteNag = () => {
  const { isOpen, open, close, sheetRef } = useBottomSheet()
  const defaultFrame = frameList[0]
  const navigate = useNavigate()
  const [selectedCategories] = useAtom(selectedCategoryAtom)
  const [text, setText] = useState('')
  const [emojiKey, setEmojiKey] = useState<string>('1')
  const [userInfo, setUserInfo] = useState('')
  const [selectedFrameKey, setSelectedFrameKey] = useState<string | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<React.FC<
    React.SVGProps<SVGSVGElement>
  > | null>(null)

  const handleSubmit = async () => {
    try {
      await axiosApi.post('/nags', {
        categories: selectedCategories,
        imageUrl: selectedFrameKey ?? 0,
        faceImageUrl: emojiKey,
        text,
        name: userInfo,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <TopWrapper>
      <Wrapper>
        <FlexBox direction="column">
          <Container>
            <Header>
              <BackWrapper onClick={() => navigate(-1)}>
                <ArrowBack />
              </BackWrapper>
              <Writer>
                <Text children="나도 한 마디" typo="Body_1" />
              </Writer>
            </Header>
          </Container>
          <WriteCard
            frameBg={selectedFrame}
            text={text}
            setText={setText}
            setEmojiKey={setEmojiKey} // ✅ 추가
          />
          <FrameWrapper>
            {frameList.map(({ name, Component }, idx) => (
              <FrameBox
                key={name}
                onClick={() => {
                  setSelectedFrame(() => Component)
                  setSelectedFrameKey((idx + 1).toString())
                }}
              >
                <Component />
              </FrameBox>
            ))}
          </FrameWrapper>
        </FlexBox>
      </Wrapper>
      <SubDiv>
        <Text typo="H3" color="gray_800" children="당신은 누구인가요?" />
        <UserInput
          placeholder="10년차 직장인 홍길동"
          value={userInfo}
          onChange={(e) => setUserInfo(e.target.value)}
        />
      </SubDiv>
      <SelectDiv>
        <Text
          typo="H3"
          color="gray_800"
          children="당신의 조언이 필요한 상황은?"
        />
        <Select onClick={open}>
          {selectedCategories.length > 0 ? (
            <SelectedCategoryList>
              {selectedCategories.map((category) => (
                <SelectedTag key={category}>{category}</SelectedTag>
              ))}
            </SelectedCategoryList>
          ) : (
            <>
              상황을 선택해주세요. <ArrowDown />
            </>
          )}
        </Select>
        <BottomSheet isOpen={isOpen} bottomSheetRef={sheetRef}>
          <Title>
            <Text typo="Body_1" children="상황을 선택해주세요" />
            <div onClick={close}>
              <CloseIcon />
            </div>
          </Title>
          <CategoryMap />
        </BottomSheet>
        <BtnWrap>
          <SendButton onClick={handleSubmit}>
            <Text typo="Body_3" color="gray_0" children="보내기" />
          </SendButton>
        </BtnWrap>
      </SelectDiv>
    </TopWrapper>
  )
}
const TopWrapper = styled.div``

const Wrapper = styled.div`
  padding: 0px 32px;
`
const Container = styled.div`
  padding: 16px 0px;
`
const Header = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BackWrapper = styled.div`
  position: absolute;
  left: 16px;
`
const Writer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 140px;
`
const FrameBox = styled.div`
  width: 46px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${theme.palette.gray_100};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const FrameWrapper = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  height: 84px;
  width: 100%;
  margin-top: 12px;
  padding: 0 0 0 153px;
  aspect-ratio: 23/32;
  display: flex;
  gap: 6px;
`
const Frame = styled.div<{
  $bg: string
  $isSelected?: boolean
}>`
  flex-shrink: 0;
  width: 46px;
  height: 64px;
  border-radius: 8px;
  background-image: url(${({ $bg }) => $bg});
  background-size: cover;
  border: ${({ $isSelected }) => ($isSelected ? '2px solid #000' : 'none')};
`
const SubDiv = styled.div`
  padding: 20px 16px 0 16px;
  width: 100%;
`
const UserInput = styled.input`
  all: unset;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  &::placeholder {
    color: ${theme.palette.gray_200};
  }
`
const SelectDiv = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`
const Select = styled.div`
  display: flex;
  height: 48px;
  padding: 12px 12px 12px 8px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid #000;
  background: ${theme.palette.gray_0};
  cursor: pointer;
  color: ${theme.palette.gray_200};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`
const SendButton = styled.button`
  display: flex;
  width: 200px;
  height: 40px;
  padding: 10px 34px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: ${theme.palette.gray_800};
  border-radius: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`
const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const SelectedCategoryList = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  gap: 8px;
  padding: 4px 0;
`

const SelectedTag = styled.div`
  flex-shrink: 0;
  padding: 6px 10px;
  background-color: ${theme.palette.gray_700};
  color: ${theme.palette.gray_0};
  border-radius: 16px;
  font-size: 14px;
`
